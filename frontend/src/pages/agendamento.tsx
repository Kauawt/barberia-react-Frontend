//'use client';
/*import React, { useState, useEffect } from 'react';
import { getAgendamentos } from '@/services/APIService'; 

const AgendamentoPage = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const data = await getAgendamentos(); 
        setAgendamentos(data);
      } catch (error) {
        setError('Erro ao buscar agendamentos');
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []); // [] 

  if (loading) {
    return <p>Carregando agendamentos...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h1>Agendamentos</h1>
      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id}>
            {agendamento.usuario?.name} - Total: {agendamento.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendamentoPage;
*/
"use client";

import React, { useEffect, useState } from "react";

const AgendamentoPage = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  useEffect(() => {
    // Dados teste enquanto não conecta com o backend
    setTimeout(() => {
      setAgendamentos([
        {
          id: 1,
          total: 70.0,
          usuario: { id: 1, nome: "João da Silva" },
          servico: "Corte de Cabelo",
          data: "18/12/2024",
          horario: "14:00",
          barbeiro: "João Pedro",
        },
        {
          id: 2,
          total: 110.0,
          usuario: { id: 2, nome: "Maria Oliveira" },
          servico: "Barba + Corte",
          data: "17/12/2024",
          horario: "10:30",
          barbeiro: "João Pedro",
        },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/fundoescuro2.png')" }}>
      <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
          <li><a href="/home" className="nav-link">Home</a></li>
          <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
          <li><a href="/cliente" className="nav-link">Cliente</a></li>
          <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
          <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
        </ul>
      </nav>
    </div>
  </header>
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-6">Tabela de Agendamentos</h1>
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr> 
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">ID</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Preço</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Nome</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Serviço</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Data</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Horário</th>
                <th className="border-b-2 border-gray-300 py-2 px-4 text-lg font-bold">Barbeiro</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.length > 0 ? (
                agendamentos.map((agendamento) => (
                  <tr key={agendamento.id} className="hover:bg-gray-100">
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.id}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.total.toFixed(2)}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.usuario.nome}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.servico}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.data}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.horario}</td>
                    <td className="border-b border-gray-300 py-2 px-4">{agendamento.barbeiro}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Carregando agendamentos...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default AgendamentoPage;
