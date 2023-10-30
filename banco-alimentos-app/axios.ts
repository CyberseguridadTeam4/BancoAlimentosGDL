import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://banco-alimentos-r7aveabl7-bojavs-svg.vercel.app',
});

export default instance;