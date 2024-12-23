"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getServicos, createServico, deleteServico } from "../services/APIService";
import Link from "next/link";

interface Servico {
  id: number;
  nomeServico: string;
  descricaoServico: string;
  precoServico: number;
  duracaoServico: number;
  statusServico: boolean;
}

const ServicosPage = () => {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [precoServico, setPrecoServico] = useState(0);
  const [duracaoServico, setDuracaoServico] = useState(0);
  const [statusServico, setStatusServico] = useState(true);
  const [mensagem, setMensagem] = useState("");
  //const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleDeleteServico = async (id: number) => {
    try {
      await deleteServico(id);
      setMensagem("Serviço excluído com sucesso!");
      fetchServicos();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      const token = localStorage.getItem("token");
  
      if (!token || !storedRole) {
        router.push("/login");
        return;
      }

      //setRole(storedRole);
      setIsLoading(false);
  
    }
  }, [router, isLoading]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const MenuItems =  () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || !role){
      return router.push('/login');
    }
    if(role === "cliente"){
      router.push("/login");
    }
    if(role === "admin"){
      return(
        <>
           <li><Link href="/home"><a className="nav-link">Home</a></Link></li>
          <li><Link href="/agendamento"><a className="nav-link">Agendamento</a></Link></li>
          <li><Link href="/servicos"><a className="nav-link">Serviços</a></Link></li>
          <li><Link href="/cadastro"><a className="nav-link">Cadastro</a></Link></li>
          <li><Link href="/ajuda"><a className="nav-link">Ajuda</a></Link></li>
          <li><Link href="/sobre"><a className="nav-link">Sobre Nós</a></Link></li>
        </>
      );
    }
    return null;
  }
  
  return (
    <div className="telafundo-custom"> {}
      {}
      <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
          {MenuItems()}
        </ul>
      </nav>
    </div>
  </header>
    {}
    <div className="relative z-10 flex flex-col items-center min-h-screen p-6">
        {}
        <h1 className="text-3xl font-bold text-center text-white p-4 w-full">
          Gerenciamento de Serviços
        </h1>

        {}
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
          {mensagem && (
            <div className="mb-4 text-center text-red-600">{mensagem}</div>
          )}

          <form onSubmit={handleCreateServico} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="nome" className="block text-xs font-semibold text-gray-700">Nome do Serviço</label>
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
              <label htmlFor="descricao" className="block text-xs font-semibold text-gray-700">Descrição</label>
              <textarea
                placeholder="Exemplo: Corte de Cabelo"
                value={descricaoServico}
                onChange={(e) => setDescricaoServico(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="preco" className="block text-xs font-semibold text-gray-700">Preço (R$)</label>
              <input
                type="number"
                placeholder="Preço (R$)"
                value={precoServico}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (valor.length <= 5) {
                    setPrecoServico(Number(valor));
                  }
                }}
                className="w-full p-3 border rounded-md focus:outline-none"
                required
                maxLength={5}
                min={0}
                step="1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duracao" className="block text-xs font-semibold text-gray-700">Duração (min)</label>
              <input
                type="number"
                placeholder="Duração (min)"
                value={duracaoServico}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (valor.length <= 2) {
                    setDuracaoServico(Number(valor));
                  }
                }}
                className="w-full p-3 border rounded-md focus:outline-none"
                required
                maxLength={2}
                min={0}
              />
            </div>

            {}
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={statusServico}
                onChange={(e) => setStatusServico(e.target.checked)}
                className="mr-2"
              />
              Ativo
            </label>

            {}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Adicionar Serviço
            </button>
          </form>
        </div>

        {}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-center text-white-800 mb-6">Lista de Serviços</h2>
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
        <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
      </div>
    </div>
  );
};

export default ServicosPage;
