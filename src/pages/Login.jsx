import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()

    try {
      const response = await api.post('/login', {
        email,
        password
      })

      const token = response.data.token

      if (!token) {
        setError("Token inválido retornado pelo servidor")
        return
      }

      localStorage.setItem("token", token)

      navigate("/dashboard")
    } 
    catch (err) {
      setError("Login inválido. Verifique email e senha.")
    }
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f2f5"
    }}>
      <div style={{
        width: 350,
        padding: 30,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              border: "1px solid #ccc"
            }}
          />

          {error && (
            <div
              style={{
                background: "#ffdddd",
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
                textAlign: "center",
                color: "#b30000"
              }}
            >
              {error}
            </div>
          )}

          <button 
            type="submit"
            style={{
              width: "100%",
              padding: 14,
              background: "#4a67ff",
              color: "white",
              fontWeight: "bold",
              borderRadius: 8,
              border: "none",
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </form>

      </div>
    </div>
  )
}
