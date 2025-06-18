import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';

export const axiosInstance = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:5001/api'
    : 'https://voicely-ed4j.onrender.com/app',
  withCredentials: true,
});
