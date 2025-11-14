import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import HeaderCard from '../components/HeaderCard'

export default function Account(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [msg,setMsg]=useState(''); const [err,setErr]=useState('')

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('user')||'{}')
    setName(user.name||''); setEmail(user.email||'')
  },[])

  async function submit(e){
    e.preventDefault(); setMsg(''); setErr('')
    try{
      await api.put('/api/user', { name, email, password }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      setMsg('Atualizado com sucesso')
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')), name, email }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setPassword('')
    }catch(err){ setErr('Erro ao atualizar') }
  }

  return (
    <div className="max-w-lg mx-auto">
      <HeaderCard title="Minha conta">
        {msg && <div className="bg-green-100 p-2 rounded mb-3 text-green-800">{msg}</div>}
        {err && <div className="bg-red-100 p-2 rounded mb-3 text-red-800">{err}</div>}
        <form onSubmit={submit}>
          <label className="block font-semibold">Nome</label>
          <input className="w-full p-3 rounded border mb-3" value={name} onChange={e=>setName(e.target.value)} />
          <label className="block font-semibold">Email</label>
          <input className="w-full p-3 rounded border mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="block font-semibold">Nova senha (opcional)</label>
          <input type="password" className="w-full p-3 rounded border mb-4" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn bg-brand-blue text-white w-full">Salvar</button>
        </form>
      </HeaderCard>
    </div>
  )
}
