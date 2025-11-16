import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { api } from "../services/api"

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get("token")

  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  async function submit(e) {
    e.preventDefault()
    const res = await api.post("/api/auth/reset-password", { token, password })
    setMsg("Senha alterada com sucesso!")
  }

  return (
    <div>
      <h1>Nova senha</h1>
      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button>Salvar</button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  )
}
