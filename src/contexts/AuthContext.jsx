import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // login via API
  async function login(email, password) {
    const res = await api.post('/api/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  }

  // register
  async function register(payload) {
    const res = await api.post('/api/register', payload);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
