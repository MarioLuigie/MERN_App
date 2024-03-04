import * as type from "../../constants/actions.js";

const initState = {
  currentPostId: "",
  isPostFormOpen: false,
  isSearchFormOpen: false
}

const appReducer = (state = initState, action) => {

  switch(action.type) {
    
    case type.CURRENT_POST_ID:
      return {
        ...state,
        currentPostId: action.data
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