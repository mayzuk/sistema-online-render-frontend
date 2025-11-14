import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Register() {
  const [name,setName] = useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [error,setError] = useState(''); const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try {
      const res = await api.post('/api/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Criar conta</h1>
      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-3">{error}</div>}
      <form onSubmit={submit}>
        <label className="block text-lg font-semibold mb-1">Nome</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded border mb-3" />
        <label className="block text-lg font-semibold mb-1">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded border mb-3" />
        <label className="block text-lg font-semibold mb-1">Senha</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded border mb-4" />
        <button className="w-full btn bg-gradient-to-r from-sky-300 to-indigo-300 font-semibold">Criar conta</button>
      </form>
    </div>
  )
}
