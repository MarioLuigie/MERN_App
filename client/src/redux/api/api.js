import axios from "axios";

const url = "http://localhost:5000";
const postsAxios = axios.create({baseURL: url});

export const readPosts = async () => {
  const data = await postsAxios.get("/posts");
  return data;
}