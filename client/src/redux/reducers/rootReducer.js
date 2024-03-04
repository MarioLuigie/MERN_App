import { combineReducers } from "redux";

import postsReducer from "./postsReducer.js";
import authReducer from "./authReducer.js";
import appReducer from "./appReducer.js";

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  app: appReducer
});

export default rootReducer;