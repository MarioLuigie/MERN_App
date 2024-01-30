import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:7070";
const API = axios.create({baseURL: `${url}/api`});

API.interceptors.request.use((req) => {
  console.log(JSON.parse(localStorage.getItem("profile")));

  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

export default API;

