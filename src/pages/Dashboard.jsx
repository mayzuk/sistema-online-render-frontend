import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [comunidades, setComunidades] = useState([])
  const navigate = useNavigate()

  async function fetchData(){
    try {
      const res = await api.get('/api/comunidades', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      setComunidades(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{ fetchData() },[])

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Painel</h2>
        <div>
          <button onClick={()=>navigate('/comunidade/novo')} className="btn bg-sky-200 mr-2">Cadastrar comunidade</button>
        </div>
      </header>

      <section className="grid gap-4">
        {comunidades.length===0 && <div className="bg-white p-4 rounded">Nenhuma comunidade cadastrada.</div>}
        {comunidades.map(c=>(
          <div key={c.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-semibold">Comunidade {c.numero_comunidade}</div>
                <div className="text-sm">{c.nome_diocese} • {c.nome_cidade} • Paróquia: {c.nome_paroquia}</div>
                <div className="text-sm">Total: {c.qtd_total} • Jovens: {c.qtd_jovens}</div>
              </div>
              <div>
                <button onClick={()=>navigate('/comunidade/'+c.id)} className="px-3 py-2 rounded border">Abrir</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
