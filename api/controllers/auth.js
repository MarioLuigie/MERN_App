import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "User doesn't exist."});
    }

    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials."});
    }

    const token = jwt.sign(
      {
        email: existUser.email,
        id: existUser._id
      },
      "secret-key",
      {expiresIn: "1h"}
    );

    console.log("EXISTUSER: ", existUser);

    res.status(200).json({ result: existUser, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong."});
    console.log(err.message);
  }
}

export const signUp = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    confirmPassword } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists."});
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match."});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ 
      name: `${firstName} ${lastName}`,
      email, 
      password: hashedPassword 
    });

    const token = jwt.sign({
      email: newUser.email, 
      id: newUser._id
    },
    "secret-key",
    {expiresIn: "1h"});

    res.status(200).json({ result: newUser, token });

    console.log("New User and token", newUser, token);

  } catch (err) {
    res.status(500).json({ message: "Something went wrong."});
    console.log(err.message);
  }
}

export const signInGoogle = async (req, res) => {

  const { credential, clientId } = req.body;

  const client = new OAuth2Client(clientId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId
    });

    const payload = ticket.getPayload();

    const existUser = await User.findOne({ email: payload.email });
    let newUser = null;
    let token = null;

    if (!existUser) {
      newUser = await User.create({
        name: payload.name,
        email: payload.email
      });

      token = jwt.sign({
        email: newUser.email,
        id: newUser._id
      },
      "secret-key",
      {expiresIn: "1h"}
      );

      res.status(200).json({result: newUser, token});

    } else {

      token = jwt.sign({
        email: existUser.email,
        id: existUser._id
      },
      "secret-key",
      {expiresIn: "1h"});

      res.status(200).json({result: existUser, token});
    }

    console.log("PAYLOAD:", payload);
    
  } catch (err) {
    res.status(500).json({ message: "Something went wrong."});
    console.log(err.message);
  }
}