import { posts as type } from "../../constants/actionTypes.js";

const postsReducer = (postsList = ["posts"], action) => {
  switch(action.type) {
    case type.READ_POSTS:
      return action.data;
    default:
      return postsList;
  }
}

export default postsReducer;