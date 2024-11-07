import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key :process.env.VITE_API_KEY
  }
});


export default axiosInstance;