import axios from 'axios';

// Create an instance with a base URL
const API = axios.create({
    
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

// Add a request interceptor (Optional: useful if you add Auth later)
API.interceptors.request.use((req) => {
  // If you had a token in localStorage, you'd add it here
  // const token = localStorage.getItem('profile');
  // if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;