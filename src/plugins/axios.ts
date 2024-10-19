import axios, { AxiosError, type AxiosInstance } from 'axios';
import Cookies from 'js-cookie'
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('JWT_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.status == 401 || error.status == 403) {
      window.location.href = 'http://localhost:3002/login'
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
