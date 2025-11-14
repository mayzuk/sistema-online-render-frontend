import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function LoginTest() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    console.log("CLICK NO LOGIN!") // ← TESTE DEFINITIVO
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Teste Login</h1>

      <form onSubmit={submit}>
        <input 
          placeholder="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{ display:"block", marginBottom:10 }}
        />

        <input 
          type="password"
          placeholder="senha"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={{ display:"block", marginBottom:10 }}
        />

        <button type="submit" style={{ padding:20, background:"blue", color:"white" }}>
          ENTRAR
        </button>
      </form>
    </div>
  )
}
