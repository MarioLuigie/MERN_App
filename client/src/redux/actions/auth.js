import { jwtDecode } from "jwt-decode";

import { auth as type } from "../../constants/actionTypes.js";
import * as api from "../api/authApi.js";

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

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: type.AUTH, data });

    navigate("/home");
  } catch (err) {
    console.log("SignIn error:", err);
  }
}

export const signUp = (formData, navigate) => async (dispatch) => {
  console.log(formData);
  try {
    const { data } = await api.signUp(formData);//{result, token}

    dispatch({ type: type.AUTH, data });

    navigate("/home");
  } catch (err) {
    console.log("SignUp error:", err);
  }
}
