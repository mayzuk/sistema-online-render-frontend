import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import { motion } from 'framer-motion'

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [error,setError]=useState(''); const navigate=useNavigate()

  async function submit(e){
    e.preventDefault(); setError('')
    try{
      const res = await api.post('/api/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    }catch(err){
      setError(err.response?.data?.error || 'Erro ao autenticar')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <motion.div initial={{ scale:0.98, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.4 }} className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Entrar</h1>
        {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-3">{error}</div>}
        <form onSubmit={submit}>
          <label className="block font-semibold">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded border mb-3" />
          <label className="block font-semibold">Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded border mb-4" />
          <button type="submit" className="w-full btn bg-gradient-to-r from-brand-sky to-brand-blue text-white font-semibold">Entrar</button>
        </form>
        <div className="mt-3 text-sm">Não tem conta? <Link to="/register" className="text-blue-700 underline">Criar</Link></div>
      </motion.div>
    </div>
  )
}
