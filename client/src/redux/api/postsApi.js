import API from "./api.js";

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