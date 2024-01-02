import axios from "axios";

const url = process.env.NODE_ENV === 'production' ? "https://mern-app-marioluigie.vercel.app" : "http://localhost:5000";
const postsAxios = axios.create({baseURL: `${url}/api`});

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