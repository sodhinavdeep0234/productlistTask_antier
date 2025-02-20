import axios, {AxiosInstance} from 'axios';
import {getBaseUrl} from './constants';
// Create an Axios instance with the base URL
const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

// Add request interceptor
instance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    // Handle request error
    Promise.reject(error);
  },
);

// Add response interceptor
instance.interceptors.response.use(
  response => {
    // Return the data from the response
    return response?.data;
  },
  error => {
    // Handle response error
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    } else {
      return Promise.reject(error);
    }
  },
);
export default instance;
