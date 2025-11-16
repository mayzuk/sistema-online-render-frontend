import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { api } from '../../services/api'


export default function CarismasAdmin(){
const [carismas, setCarismas] = useState([])
const [nome, setNome] = useState('')


useEffect(()=>{ api.get('/api/admin/carismas').then(r=>setCarismas(r.data)).catch(()=>{}) }, [])


async function add(){
try{
await api.post('/api/admin/carismas',{ nome })
const r = await api.get('/api/admin/carismas')
setCarismas(r.data)
setNome('')
}catch(err){ console.error(err); alert('Erro') }
}


return (
<AdminLayout title="Carismas">
<div className="mb-4 flex gap-2">
<input value={nome} onChange={e=>setNome(e.target.value)} className="p-2 border rounded w-full" placeholder="Nome do carisma" />
<button onClick={add} className="px-4 py-2 rounded bg-brand-blue text-white">Adicionar</button>
</div>
<div className="space-y-2">
{carismas.map(c => <div key={c.id} className="bg-white p-3 rounded shadow">{c.nome}</div>)}
</div>
</AdminLayout>
)
}
