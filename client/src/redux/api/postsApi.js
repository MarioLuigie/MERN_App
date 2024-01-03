import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:7070";
const postsAxios = axios.create({baseURL: `${url}/api`});

console.log(postsAxios);

export const getPosts = () => {
  
  const data =  postsAxios.get("/posts");
  return data;
}

export const createPost = (formData) => {
  const data = postsAxios.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return data;
}

export const updatePost = (id, editedPost) => {
  const data = postsAxios.patch(`/posts/${id}`, editedPost);
  return data;
}

export const likePost = (id) => {
  const data = postsAxios.patch(`/posts/${id}/likePost`);
  return data;
}

export const deletePost = (id) => {
  const data = postsAxios.delete(`/posts/${id}`);
  console.log(data);
  return data;
}