import React, { useEffect, useState } from "react";
import {
  getServicos,
  getClientes,
  createAgendamento,
  getAgendamentos,
  deleteAgendamento,
  getUsuarios,
} from "../services/APIService";

interface Servico {
  id: number;
  nomeServico: string;
  precoServico: number;
}

interface Cliente {
  id: number;
  nomeCliente: string;
}

interface Usuario {
  id: number;
  nome: string;
}

interface Solicitacao {
  servicoId: number;
  quantidade: number;
}

const AgendamentoPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<number | null>(
    null
  );
  const [quantidade, setQuantidade] = useState<number>(1);
  const [mensagem, setMensagem] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dataAgendamento, setDataAgendamento] = useState<string>("");
  const [horaAgendamento, setHoraAgendamento] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicosData = await getServicos();
        setServicos(servicosData);
        const clientesData = await getClientes();
        setClientes(clientesData);
        const agendamentosData = await getAgendamentos();
        setAgendamentos(agendamentosData);
        const usuariosData = await getUsuarios();
        setUsuarios(usuariosData);

        const userRole = localStorage.getItem("role");
        setRole(userRole);

        if (userRole === "cliente") {
          const userId = Number(localStorage.getItem("id"));
          setUsuarioId(null);
          setClienteId(userId);
        } else if (userRole === "admin") {
          setUsuarioId(null);
          setClienteId(null);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const adicionarSolicitacao = () => {
    if (servicoSelecionado && quantidade > 0) {
      setSolicitacoes((prev) => [
        ...prev,
        { servicoId: servicoSelecionado, quantidade },
      ]);
      setQuantidade(1);
    } else {
      alert("Selecione o serviço, cliente e a quantidade antes de adicionar.");
    }
  };

  const handleCreateAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataAgendamento || !horaAgendamento || solicitacoes.length === 0) {
      setMensagem("Preencha todos os campos antes de agendar.");
      return;
    }

    try {
      const dataHoraAgendamento = `${dataAgendamento}T${horaAgendamento}:00`;

      const userId = Number(localStorage.getItem("id") || "0");

      const novoAgendamento = {
        usuarioId: role === "admin" ? userId! : usuarioId!,
        clienteId: role === "cliente" ? userId! : clienteId!,
        dataAgendamento: dataHoraAgendamento, 
        solicitacoes,
      };

      await createAgendamento(novoAgendamento);
      setMensagem("Agendamento criado com sucesso!");

      setClienteId(null);
      setUsuarioId(null);
      setDataAgendamento("");
      setHoraAgendamento("");
      setSolicitacoes([]);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setMensagem("Erro ao criar agendamento. Tente novamente.");
    }
  };

  const handleDeleteAgendamento = async (id: number) => {
    try {
      await deleteAgendamento(id);
      setMensagem("Agendamento excluído com sucesso!");
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setMensagem("Erro ao excluir agendamento.");
    }
  };

  return (
    <div className="telafundo-custom min-h-screen flex flex-col">
      <header className="header">
        <div className="container">
          <nav>
            <ul className="header-nav flex justify-between items-center">
              <li>
                <a href="/home" className="nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/agendamento" className="nav-link">
                  Agendamento
                </a>
              </li>
              <li>
                <a href="/servicos" className="nav-link">
                  Serviços
                </a>
              </li>
              
              <li>
                <a href="/ajuda" className="nav-link">
                  Ajuda
                </a>
              </li>
              <li>
                <a href="/sobre" className="nav-link">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold text-white mb-6">
          Tabela de Agendamentos
        </h1>
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">
                  ID
                </th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">
                  Usuário
                </th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">
                  Data
                </th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">
                  Total
                </th>
                
              </tr>
            </thead>
            <tbody>
              {agendamentos.length > 0 ? (
                agendamentos.map((agendamento) => (
                  <tr key={agendamento.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-2 px-4">
                      {agendamento.id}
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4">
                      {agendamento.usuario?.nome || "N/A"}
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4">
                      {new Date(agendamento.dataAgendamento).toLocaleString()}
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4">
                      R$ {agendamento.total.toFixed(2)}
                    </td>
                    <td className="border-b border-gray-300 py-2 px-4">
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

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl mt-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            Criar Novo Agendamento
          </h2>
          {mensagem && (
            <p className="text-center text-red-600 mb-4">{mensagem}</p>
          )}
          <form onSubmit={handleCreateAgendamento} className="space-y-4">
            <div>
              <label
                htmlFor="clienteId"
                className="block text-sm font-bold text-gray-700"
              >
                {role === "cliente"
                  ? "Você está logado como cliente"
                  : "Selecione o Cliente"}
              </label>
              <select
                value={clienteId || ""}
                onChange={(e) => setClienteId(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
                required
                disabled={role === "cliente"}
              >
                <option value="" disabled>
                  {role === "cliente" ? "Você" : "Selecione um cliente"}
                </option>
                {role === "admin" &&
                  clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nomeCliente}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="usuarioId"
                className="block text-sm font-bold text-gray-700"
              >
                {role === "admin"
                  ? "Você está logado como admin"
                  : "Selecione o barbeiro"}
              </label>
              <select
                value={usuarioId || ""}
                onChange={(e) => setUsuarioId(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
                required
                disabled={role !== "cliente"}
              >
                <option value="" disabled>
                  {role === "admin" ? "Você" : "Selecione um barbeiro"}
                </option>
                {role === "cliente" &&
                  usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                {role === "admin" &&
                  usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="data"
                className="block text-sm font-bold text-gray-700"
              >
                Data
              </label>
              <input
                type="date"
                id="data"
                value={dataAgendamento}
                onChange={(e) => setDataAgendamento(e.target.value)}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="hora"
                className="block text-sm font-bold text-gray-700"
              >
                Hora
              </label>
              <input
                type="time"
                id="hora"
                value={horaAgendamento}
                onChange={(e) => setHoraAgendamento(e.target.value)}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="servico"
                className="block text-sm font-bold text-gray-700"
              >
                Serviço
              </label>
              <select
                value={servicoSelecionado || ""}
                onChange={(e) => setServicoSelecionado(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="" disabled>
                  Selecione um serviço
                </option>
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {servico.nomeServico} - R$ {servico.precoServico.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quantidade"
                className="block text-sm font-bold text-gray-700"
              >
                Quantidade
              </label>
              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                min={1}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <button
              type="button"
              onClick={adicionarSolicitacao}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md"
            >
              Adicionar Serviço
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md"
            >
              Agendar
            </button>
          </form>
          <h2 className="text-xl font-bold text-black mt-4">
            Serviços Adicionados:
          </h2>
          <ul>
            {solicitacoes.map((solic, index) => (
              <li key={index}>
                Serviço ID: {solic.servicoId} - Quantidade: {solic.quantidade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoPage;
