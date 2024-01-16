import { jwtDecode } from "jwt-decode";

import { auth as type } from "../../constants/actionTypes.js";

export const downloadToken = (credentialResponse) => async (dispatch) => {
  console.log("credentialResponse from redux action:", credentialResponse);

  try {
    const token = credentialResponse?.credential;
    let tokenDecoded = null;

    if (token) {
      tokenDecoded = jwtDecode(token);
      // if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    
    dispatch({type: type.AUTH, data: tokenDecoded});

  } catch (err) {
    console.error("Something went wrong...DOWNLOAD TOKEN ERROR", err.message);
  }
}