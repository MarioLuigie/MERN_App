import { posts as type } from "../../constants/actionTypes.js";

const postsReducer = (postsList = [], action) => {
  switch(action.type) {
    case type.READ_POSTS:
      return action.data;
    case type.CREATE_POST:
      return [...postsList, action.data];
    case type.UPDATE_POST:
    case type.UPDATE_LIKES:
      return postsList.map(post => (
        post._id === action.data._id
          ? {...post, ...action.data}
          : post
      ));
    case type.DELETE_POST:
      console.log(action.data);
      return postsList.filter(post => post._id !== action.data);
    case type.DELETE_POSTS:
      return [];
    default:
      return postsList;
  }
}

export default postsReducer;