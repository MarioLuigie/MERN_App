import * as api from "../api/postsApi";
import { posts as type} from "../../constants/actionTypes.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    console.log(data);

    dispatch({type: type.READ_POSTS, data});
  } catch (err) {
    console.error("Something went wrong...READ ERROR", err.message);
  }
}

export const postPost = (newPost) => async (dispatch) => {
  const { creator, title, message, tags, files } = newPost;

  const formData = new FormData();

  formData.append("creator", creator);
  formData.append("title", title);
  formData.append("message", message);
  formData.append("tags", tags);
  formData.append("files", files);
  
  console.log("utworzona form data", formData);

  formData.forEach(function(value, key) {
    console.log(key, value);
  });
  
  
  try {
    const { data } = await api.postPost(formData);
    console.log(data);

    dispatch({type: type.CREATE_POST, data})
  } catch (err) {
    console.error("Something went wrong...CREATE ERROR", err.message);
  }
}