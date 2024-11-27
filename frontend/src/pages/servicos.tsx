"use client";

import React, { useState, useEffect } from "react";
import { getServicos, createServico, deleteServico } from "../services/APIService";

const ServicosPage = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [precoServico, setPrecoServico] = useState(0);
  const [duracaoServico, setDuracaoServico] = useState(0);
  const [statusServico, setStatusServico] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const fetchServicos = async () => {
    try {
      const response = await getServicos();
      setServicos(response);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleCreateServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novoServico = {
        nomeServico,
        descricaoServico,
        precoServico,
        duracaoServico,
        statusServico,
      };
      await createServico(novoServico);
      setMensagem("Serviço criado com sucesso!");
      setNomeServico("");
      setDescricaoServico("");
      setPrecoServico(0);
      setDuracaoServico(0);
      setStatusServico(true);
      fetchServicos();
    } catch (error) {
      setMensagem("Erro ao criar serviço. Verifique os campos e tente novamente.");
    }
  };

  const handleDeleteServico = async (id: number) => {
    try {
      await deleteServico(id);
      setMensagem("Serviço excluído com sucesso!");
      fetchServicos();
    } catch (error) {
      setMensagem("Erro ao excluir serviço.");
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
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

      <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-black-800 mb-6">
            Gerenciamento de Serviços
          </h1>

          {mensagem && (
            <div className="mb-4 text-center text-red-600">{mensagem}</div>
          )}

          <form onSubmit={handleCreateServico} className="space-y-6">
          <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm">
                    Nome do Serviço
                  </label>
            <input
              type="text"
              placeholder="Nome do Serviço"
              value={nomeServico}
              onChange={(e) => setNomeServico(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none"
              required
            />
            </div>
            <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm">
                  Descrição
                  </label>
            <textarea
              placeholder="Exemplo: Corte de Cabelo"
              value={descricaoServico}
              onChange={(e) => setDescricaoServico(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none"
              required
            />
            </div>
            <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm">
                  Preço (R$)
                  </label>
            <input
              type="number"
              placeholder="Preço (R$)"
              value={precoServico}
              onChange={(e) => {
                const valor = e.target.value;
                if (valor.length <= 5) { // Limita a quantidade de caracteres para 2
                  setPrecoServico(Number(valor));
                }
              }}
              className="w-full p-3 border rounded-md focus:outline-none"
              required
              maxLength={5}
              min={0}  // Para garantir que o valor não seja negativo
              step="1" // Permitindo casas decimais para o preço
            />
            </div>
            <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm">
                  Duração (min)
                  </label>
            <input
              type="number"
              placeholder="Duração (min)"
              value={duracaoServico}
              onChange={(e) => {
                const valor = e.target.value;
                if (valor.length <= 2) { // Limita a quantidade de caracteres para 2
                  setDuracaoServico(Number(valor));
                }
              }}
              className="w-full p-3 border rounded-md focus:outline-none"
              required
              maxLength={2}
              min={0} 
            />
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={statusServico}
                onChange={(e) => setStatusServico(e.target.checked)}
                className="mr-2"
              />
              Ativo
            </label>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Adicionar Serviço
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">Lista de Serviços</h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Duração</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico) => (
                <tr key={servico.id} className="border-b">
                  <td>{servico.id}</td>
                  <td>{servico.nomeServico}</td>
                  <td>{servico.descricaoServico}</td>
                  <td>R$ {servico.precoServico}</td>
                  <td>{servico.duracaoServico} min</td>
                  <td>{servico.statusServico ? "Ativo" : "Inativo"}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteServico(servico.id)}
                      className="text-red-500 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicosPage;
