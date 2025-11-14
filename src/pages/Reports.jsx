export default function Reports() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>

      <p className="text-gray-600 mb-4">Selecione um tipo de relatório:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="p-4 bg-sky-200 rounded-xl font-semibold">Comunidades cadastradas</button>
        <button className="p-4 bg-green-200 rounded-xl font-semibold">Usuários ativos</button>
        <button className="p-4 bg-yellow-200 rounded-xl font-semibold">Eventos recentes</button>
        <button className="p-4 bg-purple-200 rounded-xl font-semibold">Exportar CSV</button>
      </div>
    </div>
  );
}
