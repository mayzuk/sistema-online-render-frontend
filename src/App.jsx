import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateCommunity from './pages/CreateCommunity'
import Reports from './pages/Reports'
import Account from './pages/Account'
import CommunityForm from './pages/CommunityForm'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  const isLogged = !!localStorage.getItem('token')
  return (
    <div className="min-h-screen bg-slate-50">
      {isLogged && <Nav />}
      <main className={isLogged ? 'pl-72 p-8 transition-all' : 'p-8'}>
        <Routes>
          <Route path="/" element={ isLogged ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
          <Route path="/comunidade/novo" element={<RequireAuth><CreateCommunity/></RequireAuth>} />
          <Route path="/comunidade/:id" element={<RequireAuth><CommunityForm/></RequireAuth>} />
          <Route path="/relatorios" element={<RequireAuth><Reports/></RequireAuth>} />
          <Route path="/user" element={<RequireAuth><Account/></RequireAuth>} />
        </Routes>
      </main>
    </div>
  )
}
