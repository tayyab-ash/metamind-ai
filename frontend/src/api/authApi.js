import axios from 'axios';

// Base Axios Client
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// signup API
export const signupService = async (userData) => {
  const response = await apiClient.post('/users/signup', userData);
  return response.data;
};
// LoginAPi
export const loginService = async (credentials) => {
        const response = await apiClient.post('/login', credentials);
        return response.data;
};

  
  
  // Free API: Get Random Data for Testing
  export const getRandomData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data; // Returns an array of random posts
  };
  

