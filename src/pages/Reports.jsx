import React, { useState } from 'react'
import { api } from '../services/api'
import HeaderCard from '../components/HeaderCard'

export default function Reports(){
  const [tipo,setTipo] = useState(''); const [dados,setDados] = useState([])

  async function gerar(){
    try{
      const res = await api.get('/api/relatorios/'+tipo, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      setDados(res.data)
    }catch(err){ console.error(err) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <HeaderCard title="Relatórios">
        <div className="flex gap-3 items-center">
          <select value={tipo} onChange={e=>setTipo(e.target.value)} className="p-3 rounded border">
            <option value="">-- selecione --</option>
            <option value="diocese">Por Diocese</option>
            <option value="etapas">Por Etapas</option>
            <option value="carismas">De Carismas</option>
            <option value="vocacionados">De Vocacionados</option>
          </select>
          <button onClick={gerar} className="px-4 py-2 rounded bg-sky-200">Gerar</button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border">
            <tbody>
              {dados.map((r,i)=>(<tr key={i} className="border-t">{Object.values(r).map((v,j)=>(<td key={j} className="p-2 border align-top">{v?.toString?.()||''}</td>))}</tr>))}
            </tbody>
          </table>
        </div>
      </HeaderCard>
    </div>
  )
}
