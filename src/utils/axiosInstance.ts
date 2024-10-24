import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;