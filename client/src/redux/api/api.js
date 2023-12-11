import axios from "axios";

const url = "http://localhost:5000";
const postsAxios = axios.create({baseURL: url});

export const getPosts = async () => {
  const data = await postsAxios.get("/posts");
  return data;
}

export const postPost = async (newPost) => {
  const data = await postsAxios.post("/posts", newPost);
  return data;
}