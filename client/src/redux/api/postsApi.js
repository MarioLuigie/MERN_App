import axios from "axios";

const url = "http://localhost:5000";
const postsAxios = axios.create({baseURL: url});

export const getPosts = () => {
  const data =  postsAxios.get("/posts");
  return data;
}

export const postPost = (formData) => {
  const data = postsAxios.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return data;
}