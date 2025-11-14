import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await api.post('/api/register', { name, email, password })

      if (res.data?.user) {
        setSuccess('Usuário criado com sucesso! Redirecionando...')
        setName('')
        setEmail('')
        setPassword('')

        // ⏳ Redireciona após 2 segundos
        setTimeout(() => {
          navigate('/login')
        }, 2000)

      } else {
        setError('Não foi possível criar o usuário.')
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar usuário.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Criar conta</h1>

      {/* Caixa verde de sucesso */}
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-3">
          {success}
        </div>
      )}

      {/* Caixa vermelha de erro */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-3">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <label className="block text-lg font-semibold mb-1">Nome</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 rounded border mb-3"
        />

        <label className="block text-lg font-semibold mb-1">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded border mb-3"
        />

        <label className="block text-lg font-semibold mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded border mb-4"
        />

        <button 
          type=submit 
          className="w-full btn bg-gradient-to-r from-sky-300 to-indigo-300 font-semibold"
        >
          Criar conta
        </button>
      </form>
    </div>
  )
}
