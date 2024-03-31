
import axios from 'axios';

// Create a custom Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: `http://${process.env.BACKEND_URL}` // Replace with your API's base URL
});

// Add a request interceptor to dynamically set the token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("TOKEN: ",token);
    if (token) {

      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Url = `http://${process.env.BACKEND_URL}/`;
console.log('Vicky URL',Url,`${process.env.BACKEND_URL}`,`${process.env}`);
export { axiosInstance, Url }
