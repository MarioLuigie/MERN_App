import * as api from "../api/postsApi";
import * as type from "../../constants/actions.js";

export const getPosts = (searchParams) => async (dispatch) => {
  try {
    dispatch({type: type.START_LOADING});

    const { data } = await api.getPosts(searchParams);
    // data to { 
    //   postsList: [{}, {}], 
    //   currentPage: number, 
    //   numbOfPages: number
    // }
    console.log("Zasoby z bazy mDB", data);

    dispatch({type: type.READ_POSTS, data});

    dispatch({type: type.END_LOADING});

  } catch (err) {
    console.error("Something went wrong...READ ERROR", err.message);
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: type.START_LOADING});

    const { data } = await api.getPost(id);

    dispatch({type: type.READ_POST, data});

    dispatch({type: type.END_LOADING});

    // console.log("PostDetails:", data);
    
  } catch (err) {
    console.error("Something went wrong...READ ERROR", err.message);
  }
}

// export const getPostsBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     dispatch({type: type.START_LOADING});

//     const { data } = await api.getPostsBySearch(searchQuery);

//     console.log(data);

//     dispatch({type: type.READ_POSTS_BY_SEARCH, data});

//     dispatch({type: type.END_LOADING});

//   } catch (err) {
//     console.error("Something went wrong...READ BY SEARCH ERROR", err);
//   }
// }

export const createPost = (newPost, navigate) => async (dispatch) => {
  const { name, title, message, tags, files } = newPost;

  console.log(files);
  console.log(newPost);
  console.log("TAGS FROM ACTION:", tags);

  const formData = new FormData();

  formData.append("name", name);
  formData.append("title", title);
  formData.append("message", message);
  formData.append("tags", tags);
  files.forEach((file) => {
    formData.append("files", file);
  });

  // console.log("utworzona form data", formData);//{}

  //Iterate on formData, because it is a special object, and common console log may be badly resolve to show what is inside of formdata
  formData.forEach(function(value, key) {
    console.log(key, value);
  });//[content]
  
  try {
    dispatch({type: type.START_LOADING});

    const { data } = await api.createPost(formData);
    console.log(data);

    navigate(`/home/${data._id}`)

    dispatch({type: type.CREATE_POST, data});

    dispatch({type: type.END_LOADING});

  } catch (err) {
    console.error("Something went wrong...CREATE ERROR", err.message);
  }
}

export const updatePost = (id, editedPost) => async (dispatch) => {
  // console.log("ID from redux action:", id);
  // console.log("Edited post from redux action:", editedPost);
  // console.log("Edited post from redux action:", editedPost.tags);
  try {
    const { data } = await api.updatePost(id, editedPost);
    console.log(data);

    dispatch({type: type.UPDATE_POST, data});

  } catch (err) {
    console.error("Something went wrong...UPDATE ERROR", err.message);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);//updated post
    console.log("LIKE:", data);

    dispatch({type: type.UPDATE_LIKES, data});

  } catch (err) {
    console.log(err);
  }
}

export const commentPost = (postId, comment) => async (dispatch) => {
  try {
    // console.log("$$$", comment);
    const { data } = await api.commentPost(postId, comment);

    // console.log("***", data);

    dispatch({type: type.COMMENT_POST, data});

    // return data;
    
  } catch (err) {
    console.log(err);
  }
}

export const updateComment = (postId, commentId, editedComment) => async (dispatch) => {
  try {
    const { data } = await api.updateComment(postId, commentId, editedComment);

    dispatch({type: type.UPDATE_COMMENT, data});
    
  } catch (err) {
    console.log(err);
  }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(postId, commentId);
    // console.log("deleteComment data:", data);

    dispatch({type: type.DELETE_COMMENT, data});

  } catch (err) {
    console.error("Something went wrong...DELETE COMMENT ERROR", err.message);
  }
}

export const deletePost = (id) => async (dispatch) => {
  console.log(id);

  try {
    const { data } = await api.deletePost(id);
    console.log(data);

    dispatch({type: type.DELETE_POST, data});

  } catch (err) {
    console.error("Something went wrong...DELETE POST ERROR", err.message);
  }
}



