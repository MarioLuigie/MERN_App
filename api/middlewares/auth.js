import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    //I have two types of auth (custom auth, google auth)
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "secret-test");//Here I know which user is login and what he can do in this app
    }

  } catch (err) {
    console.log(err.message);
  }
}

export default auth;