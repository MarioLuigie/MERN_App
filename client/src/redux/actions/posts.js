import * as api from "../api/postsApi";
import { posts as type} from "../../constants/actionTypes.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    console.log("Zasoby z bazy mDB", data);

    dispatch({type: type.READ_POSTS, data});
  } catch (err) {
    console.error("Something went wrong...READ ERROR", err.message);
  }
}

export const createPost = (newPost) => async (dispatch) => {
  const { creator, title, message, tags, files } = newPost;

  console.log(files);
  console.log(newPost);

  const formData = new FormData();

  formData.append("creator", creator);
  formData.append("title", title);
  formData.append("message", message);
  formData.append("tags", tags);
  files.forEach((file) => {
    formData.append("files", file);
  });

  console.log("utworzona form data", formData);//[]

  //Iterate on formData, because it is a special object, and common console log may be badly resolve to show what is inside of formdata
  formData.forEach(function(value, key) {
    console.log(key, value);
  });//[content]
  
  
  try {
    const { data } = await api.createPost(formData);
    console.log(data);

    dispatch({type: type.CREATE_POST, data})
  } catch (err) {
    console.error("Something went wrong...CREATE ERROR", err.message);
  }
}

export const updatePost = (id, editedPost) => async (dispatch) => {
  console.log("ID from redux action:", id);
  console.log("Edited post from redux action:", editedPost);
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
    const { data } = await api.likePost(id);
    console.log("LIKE:", data);

    dispatch({type: type.UPDATE_LIKES, data});

  } catch (err) {
    console.log(err);
  }
}

export const deletePost = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.deletePost(id);
    console.log(data);

    dispatch({type: type.DELETE_POST, data});
  } catch (err) {
    console.error("Something went wrong...UPDATE ERROR", err.message);
  }
}