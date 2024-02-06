import API from "./api.js";

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
export const signInGoogle = (googleResposne) => API.post("/user/signInGoogle", googleResposne);