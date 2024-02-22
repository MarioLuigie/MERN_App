import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const secretKey = "secret-key";

  try {
    const token = req.headers.authorization.split(" ")[1];

    //I have two types of auth (custom auth, google auth)
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //Here I know which user is login and what he can do in this app
      decodedData = jwt.verify(token, secretKey);

      req.userId = decodedData?.id;
      // req.userId = decodedData;

      // console.log("DECODED DATA", decodedData);
      
    } else {
      //Decoded google token
      decodedData = jwt.decode(token);

      //sub - google id for user
      req.userId = decodedData?.sub;
    }

    next();

  } catch (err) {
    console.log(err.message);
  }
}

export default auth;