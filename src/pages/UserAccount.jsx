import { useState } from "react";
import { api } from "../services/api";

export default function UserAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg(""); setError("");

    try {
      await api.put("/api/account/update", { email, password });
      setMsg("Dados atualizados com sucesso!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao atualizar dados");
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>

      {msg && <div className="bg-green-100 text-green-800 p-3 rounded mb-3">{msg}</div>}
      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-3">{error}</div>}

      <form onSubmit={submit}>
        <label className="block font-semibold mb-1">Novo Email</label>
        <input className="w-full border p-3 rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} />

        <label className="block font-semibold mb-1">Nova Senha</label>
        <input type="password" className="w-full border p-3 rounded mb-4" value={password} onChange={e=>setPassword(e.target.value)} />

        <button className="bg-indigo-500 text-white w-full p-3 rounded font-semibold">
          Atualizar
        </button>
      </form>
    </div>
  );
}
