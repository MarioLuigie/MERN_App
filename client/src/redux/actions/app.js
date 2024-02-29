import * as type from "../../constants/actions.js";

export const updateCurrentPostId = (currentPostId) => (dispatch) => {

  dispatch({type: type.CURRENT_POST_ID, data: currentPostId});
}

export const updateCreatePostFormOpen = (bool) => (dispatch) => {

  dispatch({type: type.CREATE_POST_FORM_OPEN, data: bool});
}

export const updateSearchFormOpen = (bool) => (dispatch) => {

  dispatch({type: type.SEARCH_FORM_OPEN, data: bool});
}