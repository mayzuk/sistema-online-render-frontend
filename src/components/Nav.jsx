import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="w-full bg-indigo-600 text-white p-4 shadow-lg mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Menu</h1>

        <nav className="flex gap-6">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/community/create" className="hover:underline">Criar Comunidade</Link>
          <Link to="/reports" className="hover:underline">Relatórios</Link>
          <Link to="/account" className="hover:underline">Minha Conta</Link>
          <button onClick={logout} className="hover:underline">Sair</button>
        </nav>
      </div>
    </div>
  );
}
