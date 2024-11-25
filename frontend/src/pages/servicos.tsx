"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ServicosPage = () => {
  const [servicos, setServicos] = useState([]);
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [precoServico, setPrecoServico] = useState(0);
  const [duracaoServico, setDuracaoServico] = useState(0);
  const [statusServico, setStatusServico] = useState(true);

  const fetchServicos = async () => {
    try {
      const response = await axios.get("/api/servicos"); 
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleCreateServico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newServico = {
        nomeServico,
        descricaoServico,
        precoServico,
        duracaoServico,
        statusServico,
      };
      await axios.post("/api/servicos", newServico);
      setNomeServico("");
      setDescricaoServico("");
      setPrecoServico(0);
      setDuracaoServico(0);
      setStatusServico(true);
      fetchServicos();
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
    }
  };

  const handleDeleteServico = async (id: number) => {
    try {
      await axios.delete(`/api/servicos/${id}`);
      fetchServicos();
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 opacity-80"
        style={{ backgroundImage: "url('/images/fundo_barberia.jpeg')" }}
      ></div>

      {}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-black-800 mb-6">
            Gerenciamento de Serviços
          </h1>
          
          {}
          <form onSubmit={handleCreateServico} className="space-y-6">
  <div className="grid grid-cols-1 gap-4">
    {}
    <input
      type="text"
      placeholder="Nome do Serviço"
      value={nomeServico}
      onChange={(e) => setNomeServico(e.target.value)}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    {}
    <textarea
      placeholder="Descrição do Serviço"
      value={descricaoServico}
      onChange={(e) => setDescricaoServico(e.target.value)}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    ></textarea>
    
    {}
    <div>
      <label className="block text-sm font-medium text-gray-700">Preço</label>
      <input
        type="number"
        placeholder="Preço"
        value={precoServico}
        onChange={(e) => setPrecoServico(Number(e.target.value))}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {}
    <div>
      <label className="block text-sm font-medium text-gray-700">Duração (Minutos)</label>
      <input
        type="number"
        placeholder="Duração (Minutos)"
        value={duracaoServico}
        onChange={(e) => setDuracaoServico(Number(e.target.value))}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {}
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={statusServico}
        onChange={(e) => setStatusServico(e.target.checked)}
        className="mr-2"
      />
      <span>Ativo</span>
    </label>
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    Adicionar Serviço
  </button>
</form>
        </div>
      </div>

      {}
      <div className="relative z-10 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">Lista de Serviços</h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Descrição</th>
                <th className="py-2 px-4">Preço</th>
                <th className="py-2 px-4">Duração</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico: any) => (
                <tr key={servico.id} className="border-b">
                  <td className="py-2 px-4">{servico.id}</td>
                  <td className="py-2 px-4">{servico.nomeServico}</td>
                  <td className="py-2 px-4">{servico.descricaoServico}</td>
                  <td className="py-2 px-4">R$ {servico.precoServico}</td>
                  <td className="py-2 px-4">{servico.duracaoServico} min</td>
                  <td className="py-2 px-4">{servico.statusServico ? "Ativo" : "Inativo"}</td>
                  <td className="py-2 px-4">
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
