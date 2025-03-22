import axios from 'axios';

const instance = axios.create({
  // In development, use the local backend URL, and in production, use the relative API path.
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:3000" 
    : "/api",  // Using '/api' as the base URL for the production environment
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // This is important for cookies/session handling
});

export default instance;