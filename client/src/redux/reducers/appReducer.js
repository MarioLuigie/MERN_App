import * as type from "../../constants/actions.js";

const initState = {
  user: JSON.parse(localStorage.getItem('profile')),
  currentPostId: "",
  currentImageIndex: 0,
  lastHomePagination: "/home",
  isPostFormOpen: false,
  isSearchFormOpen: false
}

const appReducer = (state = initState, action) => {

  switch(action.type) {

    case type.SET_USER:
      return {
        ...state,
        user: action.data
      }
    
    case type.CURRENT_POST_ID:
      return {
        ...state,
        currentPostId: action.data
      };

    case type.CURRENT_IMAGE_INDEX:
      console.log("currentImageIndex from Redux", action.data);
      return {
        ...state,
        currentImageIndex: action.data
      };

    case type.LAST_HOME_PAGINATION:
      console.log("LAST HOME PAGINATION:", action.data);
      return {
        ...state,
        lastHomePagination: action.data
      };
    
    case type.POST_FORM_OPEN:
      return {
        ...state,
        isPostFormOpen: action.data
      }

    case type.SEARCH_FORM_OPEN:
      return {
        ...state,
        isSearchFormOpen: action.data
      }
  
    default:
      return state;
  }
}

export default appReducer;