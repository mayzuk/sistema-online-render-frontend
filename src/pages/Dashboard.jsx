import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [carismas, setCarismas] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [discipuladores, setDiscipuladores] = useState([]);
  const [atividades, setAtividades] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const carismasRes = await api.get("/carismas");
        const comunidadesRes = await api.get("/comunidades");
        const discipuladoresRes = await api.get("/discipuladores");
        const atividadesRes = await api.get("/atividades");

        setCarismas(carismasRes.data);
        setComunidades(comunidadesRes.data);
        setDiscipuladores(discipuladoresRes.data);
        setAtividades(atividadesRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados do backend:", error);
      }
    }

    loadData();
  }, []);

  const HeaderCard = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="p-8 space-y-8">

      {/* CARISMAS */}
      <HeaderCard title="Carismas">
        <div className="grid grid-cols-3 gap-4">
          {carismas.map((item) => (
            <div key={item.id} className="bg-slate-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{item.quantidade}</div>
              <div className="text-sm text-slate-600">{item.nome}</div>
            </div>
          ))}
        </div>
      </HeaderCard>

      {/* COMUNIDADES */}
      <HeaderCard title="Comunidades">
        <div className="grid grid-cols-3 gap-4">
          {comunidades.map((c) => (
            <div key={c.id} className="bg-slate-100 p-4 rounded-lg">
              <div className="text-lg font-bold">{c.nome}</div>
              <div className="text-sm text-slate-600">{c.cidade}</div>
            </div>
          ))}
        </div>
      </HeaderCard>

      {/* DISCIPULADORES */}
      <HeaderCard title="Discipuladores">
        <div className="grid grid-cols-3 gap-4">
          {discipuladores.map((d) => (
            <div key={d.id} className="bg-slate-100 p-4 rounded-lg">
              <div className="text-lg font-bold">{d.nome}</div>
              <div className="text-sm text-slate-600">{d.nivel}</div>
            </div>
          ))}
        </div>
      </HeaderCard>

      {/* ATIVIDADES */}
      <HeaderCard title="Atividades">
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{atividades.total_eventos}</div>
            <div className="text-sm text-slate-500">Eventos</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{atividades.total_encontros}</div>
            <div className="text-sm text-slate-500">Encontros</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{atividades.total_outros}</div>
            <div className="text-sm text-slate-500">Outros</div>
          </div>

        </div>
      </HeaderCard>

    </div>
  );
}
