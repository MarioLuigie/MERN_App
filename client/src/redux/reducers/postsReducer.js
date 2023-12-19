import { posts as type } from "../../constants/actionTypes.js";

const postsReducer = (postsList = [], action) => {
  switch(action.type) {
    case type.READ_POSTS:
      return action.data;
    case type.CREATE_POST:
      return [...postsList, action.data];
    default:
      return postsList;
  }
}

export default postsReducer;