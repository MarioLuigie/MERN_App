import { auth as type } from "../../constants/actionTypes.js";

const authReducer = (auth = {authData: null}, action) => {
  switch(action.type) {
    case type.AUTH:
      console.log(action.data);
      localStorage.setItem("profile", JSON.stringify({...action.data}));
      return {...auth, authData: action.data};
    case type.LOGOUT:
      return auth;
    default:
      return auth;
  }
}

export default authReducer;