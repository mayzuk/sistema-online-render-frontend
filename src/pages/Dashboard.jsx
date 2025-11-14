import React from 'react'
import HeaderCard from '../components/HeaderCard'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}>
        <HeaderCard title="Bem-vindo">
          <p className="text-slate-600">Resumo rápido das comunidades e atividades.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">128</div>
              <div className="text-sm text-slate-500">Comunidades</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">412</div>
              <div className="text-sm text-slate-500">Pessoas</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/comunidade/novo" className="inline-block btn bg-brand-blue text-white">Cadastrar comunidade</Link>
          </div>
        </HeaderCard>
      </motion.div>

      <div className="lg:col-span-2 space-y-6">
        <HeaderCard title="Últimas comunidades">
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">Comunidade 01</div>
                <div className="text-sm text-slate-500">Diocese X • Cidade Y</div>
              </div>
              <div className="text-slate-500">15 membros</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">Comunidade 02</div>
                <div className="text-sm text-slate-500">Diocese Z • Cidade A</div>
              </div>
              <div className="text-slate-500">22 membros</div>
            </div>
          </div>
        </HeaderCard>

        <HeaderCard title="Atividades">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold text-2xl">34</div>
              <div className="text-sm text-slate-500">Novos levantados</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold text-2xl">12</div>
              <div className="text-sm text-slate-500">Em missão</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold text-2xl">8</div>
              <div className="text-sm text-slate-500">Eventos</div>
            </div>
          </div>
        </HeaderCard>
      </div>
    </div>
  )
}
