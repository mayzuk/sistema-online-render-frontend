import React, { useState, useEffect, useContext } from 'react'
import { api } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [error,setError]=useState(''); const [success,setSuccess]=useState('')
  const [cities,setCities] = useState([])
  const { register } = useContext(AuthContext)

  useEffect(()=> {
    api.get('/api/cities').then(r=>setCities(r.data)).catch(()=>{})
  },[])

  async function submit(e){
    e.preventDefault(); setError(''); setSuccess('')
    try{
      const payload = { name, email, password, city_id: selectedCity }
      const res = await register(payload)
      if(res?.user){
        setSuccess('Usuário criado com sucesso! Redirecionando...')
        setName(''); setEmail(''); setPassword('')
        // o AuthContext já guardou token e user no localStorage
        setTimeout(()=> window.location.href = '/dashboard', 1200)
      } else setError('Erro ao criar usuário')
    }catch(err){ setError(err.response?.data?.error || 'Erro ao criar usuário') }
  }

  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div className="max-w-md mx-auto mt-12">
      <motion.div initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Criar conta</h1>
        {success && <div className="bg-green-100 text-green-800 p-2 rounded mb-3">{success}</div>}
        {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-3">{error}</div>}
        <form onSubmit={submit}>
          <label className="block font-semibold">Nome</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded border mb-3" />

          <label className="block font-semibold">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded border mb-3" />

          <label className="block font-semibold">Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded border mb-4" />

          <label className="block font-semibold">Cidade</label>
          <select value={selectedCity} onChange={e=>setSelectedCity(e.target.value)} className="w-full p-3 rounded border mb-4">
            <option value="">-- selecione sua cidade --</option>
            {cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>

          <button type="submit" className="w-full btn bg-gradient-to-r from-brand-sky to-brand-blue text-white font-semibold">Criar conta</button>
        </form>
      </motion.div>
    </div>
  )
}
