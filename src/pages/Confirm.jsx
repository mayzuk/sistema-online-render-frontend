import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { api } from "../services/api"

export default function Confirm() {
  const [params] = useSearchParams()
  const token = params.get("token")
  const [msg, setMsg] = useState("Confirmando...")

  useEffect(() => {
    api.get("/api/auth/confirm?token=" + token)
      .then(() => setMsg("Conta confirmada!"))
      .catch(() => setMsg("Token inválido"))
  }, [])

  return <p>{msg}</p>
}
