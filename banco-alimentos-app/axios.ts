import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://banco-alimentos-cseo1rmbe-bojavs-svg.vercel.app/',
});

export default instance;