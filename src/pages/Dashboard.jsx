import React, { useEffect, useState, useContext } from 'react'
import HeaderCard from '../components/HeaderCard'
import { api } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await api.get('/api/dashboard')
        setData(res.data)
      } catch (e) {
        console.error(e)
        setErr('Erro ao carregar dashboard')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (err) return <p className="text-red-600">{err}</p>

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <HeaderCard title={`Bem-vindo${user?.name ? ', ' + user.name.split(' ')[0] : ''}`}>
          <p className="text-slate-600">Resumo rápido das comunidades e atividades.</p>
          <div className="mt-2 text-sm text-slate-500">
            {data.city_name ? <>Dados referentes a <strong>{data.city_name}</strong></> : 'Dados globais (administrador)'}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{data.total_comunidades}</div>
              <div className="text-sm text-slate-500">Comunidades</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{data.total_pessoas}</div>
              <div className="text-sm text-slate-500">Pessoas</div>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/comunidade/novo" className="inline-block btn bg-brand-blue text-white">
              Cadastrar comunidade
            </Link>
          </div>
        </HeaderCard>
      </div>

      <div className="lg:col-span-2">
        <HeaderCard title="Últimas comunidades">
          <div className="space-y-3">
            {data.ultimas.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">Comunidade {c.numero_comunidade || c.id}</div>
                  <div className="text-sm text-slate-500">{c.nome_diocese} • {c.nome_cidade}</div>
                </div>
                <div className="text-slate-500">{c.qtd_total} membros</div>
              </div>
            ))}
          </div>
        </HeaderCard>
      </div>

      <div>
        <HeaderCard title="Carismas">
          <div className="text-3xl font-bold">{data.total_carismas}</div>
          <div className="text-sm text-slate-500">Carismas registrados</div>
        </HeaderCard>
      </div>

      <div>
        <HeaderCard title="Atividades">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{data.atividades.total_eventos}</div>
              <div className="text-sm text-slate-500">Eventos</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{data.atividades.total_encontros}</div>
              <div className="text-sm text-slate-500">Encontros</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{data.atividades.total_outros}</div>
              <div className="text-sm text-slate-500">Outros</div>
            </div>
          </div>
        </HeaderCard>
      </div>
    </div>
  )
}
