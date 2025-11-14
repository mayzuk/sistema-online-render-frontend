import React, { useEffect, useState } from 'react'
import HeaderCard from '../components/HeaderCard'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Dashboard() {

  const [totais, setTotais] = useState(null)
  const [ultimas, setUltimas] = useState([])
  const [atividades, setAtividades] = useState(null)

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token")

      const config = { headers: { Authorization: "Bearer " + token } }

      const t = await api.get('/api/dashboard/totais', config)
      const u = await api.get('/api/dashboard/ultimas', config)
      const a = await api.get('/api/dashboard/atividades', config)

      setTotais(t.data)
      setUltimas(u.data.comunidades)
      setAtividades(a.data)
    }

    load()
  }, [])

  if (!totais || !atividades) return <p>Carregando...</p>

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* BEM-VINDO */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <HeaderCard title="Bem-vindo">
          <p className="text-slate-600">Resumo rápido das comunidades e atividades.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{totais.total_comunidades}</div>
              <div className="text-sm text-slate-500">Comunidades</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{totais.total_pessoas}</div>
              <div className="text-sm text-slate-500">Pessoas</div>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/comunidade/novo" className="inline-block btn bg-brand-blue text-white">
              Cadastrar comunidade
            </Link>
          </div>
        </HeaderCard>
      </motion.div>

      {/* ULTIMAS */}
      <div className="lg:col-span-2 space-y-6">
        <HeaderCard title="Últimas comunidades">
          <div className="space-y-3">
            {ultimas.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">Comunidade {c.numero_comunidade}</div>
                  <div className="text-sm text-slate-500">{c.nome_diocese} • {c.nome_cidade}</div>
                </div>
                <div className="text-slate-500">{c.qtd_total} membros</div>
              </div>
            ))}
          </div>
        </HeaderCard>

        {/* ATIVIDADES */}
        <HeaderCard title="Atividades">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
