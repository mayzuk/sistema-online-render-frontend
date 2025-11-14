import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'https://sistema-online-render-backend.onrender.com';

export const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});
