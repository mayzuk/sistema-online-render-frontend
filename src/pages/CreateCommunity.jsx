import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import HeaderCard from '../components/HeaderCard'

export default function CreateCommunity(){
  const [form, setForm] = useState({
    numero_comunidade:'', nome_diocese:'', nome_bispo:'', nome_cidade:'', nome_paroquia:'', nome_paroco:'', nome_vigario:'',
    qtd_total:0, qtd_jovens:0, etapa_id:null, data_formacao:'', data_ultima_etapa:'', levantados:[], carismas:[]
  })
  const [options,setOptions] = useState({etapas:[], carismas:[]})
  const [msg,setMsg] = useState(''); const [err,setErr]=useState('')

  useEffect(()=> {
    api.get('/api/options', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(r=>setOptions(r.data)).catch(()=>{})
  },[])

  function change(k,v){ setForm(prev=>({...prev, [k]: v})) }

  async function submit(e){
    e.preventDefault(); setMsg(''); setErr('')
    try{
      await api.post('/api/comunidades', form, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      setMsg('Comunidade criada com sucesso!')
      setForm({ numero_comunidade:'', nome_diocese:'', nome_bispo:'', nome_cidade:'', nome_paroquia:'', nome_paroco:'', nome_vigario:'', qtd_total:0, qtd_jovens:0, etapa_id:null, data_formacao:'', data_ultima_etapa:'', levantados:[], carismas:[] })
    }catch(err){ setErr('Erro ao salvar') }
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HeaderCard title="Cadastrar / Alterar Comunidade">
        {msg && <div className="bg-green-100 text-green-800 p-2 rounded mb-3">{msg}</div>}
        {err && <div className="bg-red-100 text-red-800 p-2 rounded mb-3">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <label className="block font-semibold">Nome da Diocese</label>
          <input className="w-full p-3 rounded border" value={form.nome_diocese} onChange={e=>change('nome_diocese', e.target.value)} />
          <label className="block font-semibold">Número da comunidade</label>
          <input className="w-full p-3 rounded border" value={form.numero_comunidade} onChange={e=>change('numero_comunidade', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold">Quantidade total</label>
              <input type="number" className="w-full p-3 rounded border" value={form.qtd_total} onChange={e=>change('qtd_total', Number(e.target.value))} />
            </div>
            <div>
              <label className="block font-semibold">Quantidade jovens</label>
              <input type="number" className="w-full p-3 rounded border" value={form.qtd_jovens} onChange={e=>change('qtd_jovens', Number(e.target.value))} />
            </div>
          </div>

          <label className="block font-semibold">Etapa</label>
          <select className="w-full p-3 rounded border" value={form.etapa_id||''} onChange={e=>change('etapa_id', e.target.value||null)}>
            <option value="">-- selecione --</option>
            {options.etapas.map(et=> <option key={et.id} value={et.id}>{et.nome}</option>)}
          </select>

          <div className="flex justify-end">
            <button className="btn bg-brand-blue text-white">Salvar comunidade</button>
          </div>
        </form>
      </HeaderCard>

      <HeaderCard title="Relatórios Rápidos">
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-slate-500">Comunidades</div>
            <div className="text-2xl font-bold">128</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-slate-500">Total pessoas</div>
            <div className="text-2xl font-bold">412</div>
          </div>
        </div>
      </HeaderCard>
    </div>
  )
}
