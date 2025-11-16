import { useState } from "react"
import { api } from "../services/api"

export default function Forgot() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  async function submit(e) {
    e.preventDefault()
    const res = await api.post("/api/auth/forgot", { email })
    setMsg("Se o e-mail existir, enviaremos instruções.")
  }

  return (
    <div>
      <h1>Recuperar senha</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button>Enviar link</button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  )
}
