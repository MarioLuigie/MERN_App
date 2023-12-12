import axios from "axios";

const url = "http://localhost:5000";
const postsAxios = axios.create({baseURL: url});

export const getPosts = () => {
  const data =  postsAxios.get("/posts");
  return data;
}

export const postPost = (newPost) => {
  const data = postsAxios.post("/posts", newPost);
  return data;
}