import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      "secret-test",
      {expiresIn: "1h"}
    );

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
    const existUser = User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists."});
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match."});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = User.create({ 
      name: `${firstName} ${lastName}`,
      email, 
      password: hashedPassword 
    });

    const token = jwt.sign({
      email: result.email, 
      id: result._id
    },
    "secret-test",
    {expiresIn: "1h"});

    res.status(200).json({ result, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong."});
    console.log(err.message);
  }
}