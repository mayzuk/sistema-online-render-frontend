import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react/dist/esm/lucide-react.js'
import { Link } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const { login } = useContext(AuthContext)

  async function submit(e){
    e.preventDefault()
    setError('')

    try{
      await login(email, password)
      // redireciona (AuthContext já guardou token/user)
      window.location.href = '/dashboard'
    }catch(err){
      setError(err.response?.data?.error || 'Erro ao autenticar')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl border border-slate-200">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-bold text-slate-800 mb-6 text-center">Acessar Conta</motion.h1>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-300">
            {error}
          </motion.div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-semibold text-slate-700 flex items-center gap-2 mb-1">
              <Mail size={18}/> Email
            </label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>

          <div>
            <label className="font-semibold text-slate-700 flex items-center gap-2 mb-1">
              <Lock size={18}/> Senha
            </label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md">
            Entrar
          </motion.button>
        </form>

        <div className="mt-5 text-sm text-center">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-700 font-semibold hover:underline">Criar conta</Link>
        </div>
      </motion.div>
      
      <div className="text-right mt-2">
  <a href="/forgot" className="text-blue-600 text-sm hover:underline">
    Esqueci minha senha
  </a>
</div>

    </div>
  )
}
