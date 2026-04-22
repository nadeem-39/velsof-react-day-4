import axios from "axios";
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
export default instance;
