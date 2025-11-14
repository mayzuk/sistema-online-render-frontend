import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CommunityForm from './pages/CommunityForm'
import Reports from './pages/Reports'
import Support from './pages/Support'
import UserAccount from './pages/UserAccount'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  const user = JSON.parse(localStorage.getItem('user')||'{}')
  return (
    <div className="min-h-screen flex">
      <Nav user={user} />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/comunidade/novo" element={<RequireAuth><CommunityForm/></RequireAuth>} />
          <Route path="/comunidade/:id" element={<RequireAuth><CommunityForm/></RequireAuth>} />
          <Route path="/relatorios" element={<RequireAuth><Reports/></RequireAuth>} />
          <Route path="/suporte" element={<RequireAuth><Support/></RequireAuth>} />
          <Route path="/user" element={<RequireAuth><UserAccount/></RequireAuth>} />
        </Routes>
      </main>
    </div>
  )
}
