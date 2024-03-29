import * as type from "../../constants/actions.js";

const initState = {
  isLoading: true, 
  postsList: [], 
  post: {},
  currentPage: 1,
  numbOfPages: 1
}

const postsReducer = (state = initState, action) => {
  switch(action.type) {

    case type.START_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case type.END_LOADING:
      return {
        ...state,
        isLoading: false
      };

    case type.READ_POST:
      // console.log("Post from reducer", action.data);
      return {
        ...state,
        post: action.data
      };

    case type.READ_POSTS:
      return {
        ...state,
        postsList: action.data.postsList,
        currentPage: action.data.currentPage,
        numbOfPages: action.data.numbOfPages
      };

    case type.CREATE_POST:
      return {
        ...state,
        postsList: [action.data, ...state.postsList],
        post: action.data
      };

    case type.UPDATE_POST:
      console.log("updatePost:", action.data);
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id
            ? {...post, ...action.data}
            : post
        )),
        post: {...state.post, ...action.data}
      }

    case type.UPDATE_LIKES:
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id
            ? {...post, ...action.data}
            : post
        ))
      }

    case type.COMMENT_POST:
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id 
            ? {...post, ...action.data}
            : post
        )),
        post: {...state.post, ...action.data}
      }

    case type.UPDATE_COMMENT:
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id 
            ? {...post, ...action.data}
            : post
        )),
        post: {...state.post, ...action.data}
      }

    case type.DELETE_COMMENT:
      console.log(action.data);
      return {
        ...state,
        postsList: state.postsList.map(post => (
          post._id === action.data._id 
            ? {...post, ...action.data}
            : post
        )),
        post: {...state.post, ...action.data}
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