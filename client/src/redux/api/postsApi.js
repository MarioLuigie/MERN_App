import API from "./api.js";

console.log(API);

export const getPosts = (searchParams) => {
  console.log("%%%", searchParams);
  const data =  API.post("/posts/search", searchParams);
  return data;
}

// export const getPosts = (page) => {
//   const data =  API.get(`/posts?page=${page}`);
//   return data;
// }

export const getPost = (id) => {
  const data = API.get(`/posts/${id}`);
  return data;
}

// export const getPostsBySearch = (searchQuery) => {
//   const data = API.get(`/posts/search?searchQuery=${searchQuery.searchValue || "none"}&tags=${searchQuery.tags}`);
//   return data;
// }

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