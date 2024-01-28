import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:7070";
const API = axios.create({baseURL: `${url}/api`});

console.log(API);

export const getPosts = () => {
  
  const data =  API.get("/posts");
  return data;
}

export const createPost = (formData) => {
  const data = API.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return data;
}

export const updatePost = (id, editedPost) => {
  const data = API.patch(`/posts/${id}`, editedPost);
  return data;
}

export const likePost = (id) => {
  const data = API.patch(`/posts/${id}/likePost`);
  return data;
}

export const deletePost = (id) => {
  const data = API.delete(`/posts/${id}`);
  console.log(data);
  return data;
}