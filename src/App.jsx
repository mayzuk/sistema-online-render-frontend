import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCommunity from "./pages/CommunityForm";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";

export default function App() {
  const isLogged = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Só renderiza o menu se estiver logado */}
      {isLogged && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Telas protegidas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community/create" element={<CreateCommunity />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
