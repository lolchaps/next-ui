// api.ts
import axios from 'axios';
import { getCookie } from 'cookies-next'; // Get the cookie reader

const api = axios.create({
  baseURL: 'http://next-api.test', // Change this to your actual API URL
  withCredentials: true, // Only needed for cookie-based authentication, can be removed for pure token
});

// Interceptor to attach the token to all requests
api.interceptors.request.use((config) => {
  // Read the token from the cookie
  const token = getCookie('auth_token'); 

  if (token) {
    // Set the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Remove the setToken export as it's handled by the interceptor now
// export function setToken(token: string) { ... } 

export default api;