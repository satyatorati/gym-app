import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000" : "/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // This is important for cookies/session handling
});

export default instance; 