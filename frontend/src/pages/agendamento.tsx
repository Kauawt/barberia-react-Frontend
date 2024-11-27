import React, { useState, useEffect } from "react";
import { getAgendamentos, createAgendamento, deleteAgendamento } from "../services/APIService";

const AgendamentoPage = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [solicitacoes, setSolicitacoes] = useState<{ servicoId: number; quantidade: number }[]>([]);
  const [mensagem, setMensagem] = useState("");

  const fetchAgendamentos = async () => {
    try {
      const response = await getAgendamentos();
      setAgendamentos(response);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleCreateAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novoAgendamento = {
        usuarioId: Number(usuarioId),
        dataAgendamento,
        solicitacoes,
      };
      await createAgendamento(novoAgendamento);
      setMensagem("Agendamento criado com sucesso!");
      setUsuarioId("");
      setDataAgendamento("");
      setSolicitacoes([]);
      fetchAgendamentos();
    } catch (error) {
      setMensagem("Erro ao criar agendamento. Verifique os campos e tente novamente.");
    }
  };

  const handleDeleteAgendamento = async (id: number) => {
    try {
      await deleteAgendamento(id);
      setMensagem("Agendamento excluído com sucesso!");
      fetchAgendamentos();
    } catch (error) {
      setMensagem("Erro ao excluir agendamento.");
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);
  return (
    
    <div className="telafundo-custom items-center justify-center">
      <header className="header">
        <div className="container">
          <nav>
            <ul className="header-nav">
              <li><a href="/home" className="nav-link">Home</a></li>
              <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
              <li><a href="/servicos" className="nav-link">Serviços</a></li>
              <li><a href="/cliente" className="nav-link">Cliente</a></li>
              <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
              <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <h1 className="text-4xl font-bold text-white mb-6">Tabela de Agendamentos</h1>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">ID</th>
              <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Usuário</th>
              <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Data</th>
              <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Total</th>
              <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.length > 0 ? (
              agendamentos.map((agendamento) => (
                <tr key={agendamento.id} className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 py-2 px-4">{agendamento.id}</td>
                  <td className="border-b border-gray-300 py-2 px-4">{agendamento.usuario?.nome || "N/A"}</td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {new Date(agendamento.dataAgendamento).toLocaleString()}
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">R$ {agendamento.total.toFixed(2)}</td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    <button
                      onClick={() => handleDeleteAgendamento(agendamento.id)}
                      className="text-red-500 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulário para criar agendamento */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-black mb-4">Criar Novo Agendamento</h2>
        {mensagem && <p className="text-center text-red-600 mb-4">{mensagem}</p>}
        <form onSubmit={handleCreateAgendamento} className="space-y-4">
          <div>
            <label htmlFor="usuarioId" className="block text-sm font-bold text-gray-700">
              ID do Usuário
            </label>
            <input
              type="number"
              id="usuarioId"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="dataAgendamento" className="block text-sm font-bold text-gray-700">
              Data do Agendamento
            </label>
            <input
              type="datetime-local"
              id="dataAgendamento"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="barbeiro" className="block text-sm font-bold text-gray-700">
              Barbeiro
            </label>
            <input
              type="text"
              id="barbeiro"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

        
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Criar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgendamentoPage;