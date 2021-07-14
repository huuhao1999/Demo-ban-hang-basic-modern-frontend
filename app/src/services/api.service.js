import axios from 'axios';
const api = axios.create({
  baseURL: global.config.API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
