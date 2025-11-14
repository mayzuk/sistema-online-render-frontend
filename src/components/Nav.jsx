import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ user }) {
  return (
    <aside className="w-72 bg-white shadow-lg p-6 flex-shrink-0" aria-label="Menu principal">
      <h1 className="text-2xl font-bold text-brand-blue mb-4">Comunidades</h1>
      <nav className="flex flex-col gap-2" role="navigation" aria-label="Navegação">
        <Link to="/" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">🏠 Início</Link>
        <Link to="/comunidades" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">📋 Comunidades</Link>
        <Link to="/comunidade/novo" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">➕ Cadastrar comunidade</Link>
        <Link to="/user" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">⚙️ Minha conta</Link>
        <Link to="/suporte" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">🛠 Solicitar suporte</Link>
        {user?.is_admin && <Link to="/relatorios" className="px-3 py-2 rounded hover:bg-sky-100 focus:outline-none">📊 Relatórios (admin)</Link>}
      </nav>
    </aside>
  )
}
