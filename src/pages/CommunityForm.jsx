import { useState } from "react";
import { api } from "../services/api";

export default function CommunityForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg(""); setError("");

    try {
      await api.post("/api/community", { name, city });
      setMsg("Comunidade criada com sucesso!");
      setName("");
      setCity("");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar comunidade");
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Comunidade</h1>

      {msg && <div className="bg-green-100 text-green-800 p-3 rounded mb-3">{msg}</div>}
      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-3">{error}</div>}

      <form onSubmit={submit}>
        <label className="block font-semibold mb-1">Nome da Comunidade</label>
        <input className="w-full border p-3 rounded mb-3" value={name} onChange={e=>setName(e.target.value)} />

        <label className="block font-semibold mb-1">Cidade</label>
        <input className="w-full border p-3 rounded mb-4" value={city} onChange={e=>setCity(e.target.value)} />

        <button className="bg-indigo-500 text-white w-full p-3 rounded font-semibold">
          Salvar
        </button>
      </form>
    </div>
  );
}
