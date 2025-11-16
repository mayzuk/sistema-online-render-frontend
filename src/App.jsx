import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateCommunity from './pages/CreateCommunity'
import Reports from './pages/Reports'
import Account from './pages/Account'
import CommunityForm from './pages/CommunityForm'

// === IMPORTAÇÕES DO PAINEL ADMIN ===
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersAdmin from './pages/admin/UsersAdmin'
import CitiesAdmin from './pages/admin/CitiesAdmin'
import EtapasAdmin from './pages/admin/EtapasAdmin'
import CarismasAdmin from './pages/admin/CarismasAdmin'
import { AuthContext } from './contexts/AuthContext'

// -------------------------------------

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

function RequireAdmin({ children }) {
  const { user } = React.useContext(AuthContext)

  if (!user) return <Navigate to="/login" replace />
  if (!user.is_admin) return <Navigate to="/" replace />

  return children
}

export default function App() {

  // 🔥 Estado que controla se o usuário está logado
  const [isLogged, setIsLogged] = React.useState(!!localStorage.getItem('token'))

  // 🔥 Atualiza automaticamente quando o token muda (login, logout)
  React.useEffect(() => {
    const listener = () => setIsLogged(!!localStorage.getItem('token'))
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">

      {/* 🔥 Navbar só aparece se o usuário estiver logado */}
      {isLogged && <Nav />}

      <main className={isLogged ? 'pl-72 p-8 transition-all' : 'p-8'}>
        <Routes>

          {/* Redirecionamento inteligente */}
          <Route path="/" element={
            isLogged
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          } />

          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/comunidade/novo" element={<RequireAuth><CreateCommunity /></RequireAuth>} />
          <Route path="/comunidade/:id" element={<RequireAuth><CommunityForm /></RequireAuth>} />
          <Route path="/relatorios" element={<RequireAuth><Reports /></RequireAuth>} />
          <Route path="/user" element={<RequireAuth><Account /></RequireAuth>} />

          {/* =================== ROTAS ADMIN =================== */}

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/admin/users"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <UsersAdmin />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/admin/cidades"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <CitiesAdmin />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/admin/etapas"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <EtapasAdmin />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/admin/carismas"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <CarismasAdmin />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          {/* ================================================== */}

        </Routes>
      </main>
    </div>
  )
}
