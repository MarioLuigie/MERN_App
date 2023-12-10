import { combineReducers } from "redux";

import postsReducer from "./postsReducer.js";

const rootReducer = combineReducers({
  postsList: postsReducer
});

export default rootReducer;