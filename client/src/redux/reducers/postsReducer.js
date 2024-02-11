import { posts as type } from "../../constants/actionTypes.js";

const postsReducer = (state = {postsList: []}, action) => {
  switch(action.type) {
    case type.READ_POSTS:
      console.log("STATE:", state);
      return {
        ...state,
        postsList: action.data.postsList,
        currentPage: action.data.currentPage,
        numbOfPages: action.data.numbOfPages
      };

    case type.READ_POSTS_BY_SEARCH:
      return {
        ...state,
        postsList: action.data.postsList
      };

    case type.CREATE_POST:
      return {
        ...state,
        postsList: [...state.postsList, action.data]
      };

    case type.UPDATE_POST:

    case type.UPDATE_LIKES:
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id
            ? {...post, ...action.data}
            : post
        ))
      }

    case type.DELETE_POST:
      return {
        ...state,
        postsList: state.postsList.filter(post => post._id !== action.data)
      };

    case type.DELETE_POSTS:
      return [];
      
    default:
      return state;
  }
}

export default postsReducer;