import { combineReducers } from "redux";

import postsReducer from "./postsReducer.js";
import authReducer from "./authReducer.js";

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer
});

export default rootReducer;