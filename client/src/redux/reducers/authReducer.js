import * as type from "../../constants/actions.js";

const authReducer = (auth = {authData: null}, action) => {
  switch(action.type) {
    case type.AUTH:
      console.log(action?.data);
      localStorage.setItem("profile", JSON.stringify({...action?.data}));
      return {...auth, authData: action?.data};

    case type.LOGOUT:
      localStorage.clear();
      return {...auth, authData: null};
      
    default:
      return auth;
  }
}

export default authReducer;