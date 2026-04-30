import axios from "axios";
import { getAccessToken } from "./authStore";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
export const userInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const notesInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
