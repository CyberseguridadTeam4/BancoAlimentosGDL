import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://banco-alimentos-api.vercel.app',
});

export default instance;