import * as type from "../../constants/actions.js";

export const updateCurrentPostId = (currentPostId) => (dispatch) => {

  dispatch({type: type.CURRENT_POST_ID, data: currentPostId});
}

export const updateIsPostFormOpen = (bool) => (dispatch) => {

  dispatch({type: type.POST_FORM_OPEN, data: bool});
}

export const updateIsSearchFormOpen = (bool) => (dispatch) => {

  dispatch({type: type.SEARCH_FORM_OPEN, data: bool});
}

export const updateCurrentImageIndex = (index) => (dispatch) => {
  dispatch({type: type.CURRENT_IMAGE_INDEX, data: index});
}