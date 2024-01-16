import { combineReducers } from "redux";

import postsReducer from "./postsReducer.js";
import authReducer from "./authReducer.js";

const rootReducer = combineReducers({
  postsList: postsReducer,
  auth: authReducer
});

export default rootReducer;