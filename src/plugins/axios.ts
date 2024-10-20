import { useAuthStore } from '@/stores/auth';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';
export const API_RUL = window.location.host == 'localhost' ? 'http://localhost:3001/api' : 'https://teste-globo-api.vercel.app/api'
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_RUL,
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
      const authStore = useAuthStore()
      authStore.logOut()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
