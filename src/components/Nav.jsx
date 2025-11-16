import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiGrid, FiBarChart2, FiUser, FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext'


export default function Nav(){
const navigate = useNavigate()
const { user, logout } = useContext(AuthContext)


function handleLogout(){
logout()
navigate('/login')
}


return (
<motion.aside initial={{ x:-40, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.4 }}
className="fixed left-0 top-0 h-full w-72 bg-white shadow-lg p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl font-bold">Menu</h2>
<div className="text-sm text-slate-500">Olá, {user?.name?.split(' ')[0] || 'Usuário'}</div>
</div>


<nav className="flex flex-col gap-3">
<Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-sky-100 to-white hover:bg-sky-100">
<FiGrid/> <span>Dashboard</span>
</Link>
<Link to="/relatorios" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-50"><FiBarChart2/> <span>Relatórios</span></Link>
<Link to="/user" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-50"><FiUser/> <span>Minha Conta</span></Link>


{/* Link admin — somente se user.is_admin for true */}
{user?.is_admin && (
<Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-50 font-semibold text-slate-700">
<FiBarChart2/> <span>Painel Admin</span>
</Link>
)}


<button onClick={handleLogout} className="mt-6 flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"><FiLogOut/> Sair</button>
</nav>
</motion.aside>
)
}
