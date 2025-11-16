import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'https://sistema-online-render-backend.onrender.com';

export const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});

// interceptor para adicionar Authorization automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, err => Promise.reject(err));
