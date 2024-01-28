import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:7070";
const API = axios.create({baseURL: `${url}/api`});

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);