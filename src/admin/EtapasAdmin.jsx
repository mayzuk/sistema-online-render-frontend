import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { api } from '../../services/api'


export default function EtapasAdmin(){
const [etapas, setEtapas] = useState([])
const [nome, setNome] = useState('')


useEffect(()=>{ api.get('/api/admin/etapas').then(r=>setEtapas(r.data)).catch(()=>{}) }, [])


async function add(){
try{
await api.post('/api/admin/etapas',{ nome })
// recarrega
const r = await api.get('/api/admin/etapas')
setEtapas(r.data)
setNome('')
}catch(err){ console.error(err); alert('Erro') }
}


return (
<AdminLayout title="Etapas">
<div className="mb-4 flex gap-2">
<input value={nome} onChange={e=>setNome(e.target.value)} className="p-2 border rounded w-full" placeholder="Nome da etapa" />
<button onClick={add} className="px-4 py-2 rounded bg-brand-blue text-white">Adicionar</button>
</div>
<div className="space-y-2">
{etapas.map(et => <div key={et.id} className="bg-white p-3 rounded shadow">{et.nome}</div>)}
</div>
</AdminLayout>
)
}
