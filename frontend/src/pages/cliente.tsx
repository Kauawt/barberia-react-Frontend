"use client";
import React from 'react';
import Link from "next/link";
const ClientePage = () => {
  return (
  <div className="telafundo-custom"> {}
      {}
      <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
        <li><a href="/home" className="nav-link">Home</a></li>
              <li><a href="/agendamento" className="nav-link">Agendamento</a></li>
              <li><a href="/servicos" className="nav-link">Serviços</a></li>
              
              <li><a href="/ajuda" className="nav-link">Ajuda</a></li>
              <li><a href="/sobre" className="nav-link">Sobre Nós</a></li>
        </ul>
      </nav>
    </div>
  </header>
    <div className="relative min-h-screen">
      {}
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
        <main className="mt-10 flex flex-col items-center w-full">
          <h2 className="text-4xl font-semibold text-white">Cliente</h2>

          {}
          <div className="mt-6 max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-black">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue="João Pedro"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cpf" className="block text-sm">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue="XXX.XXX.XXX-XX"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue="cliente@email.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="datanascimento" className="block text-sm">Data de Nascimento</label>
                <input
                  type="date"
                  id="datanascimento"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue="2000-01-01"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endereco" className="block text-sm">Endereço</label>
                <input
                  type="text"
                  id="endereco"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue="Rua Exemplo, 123"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Salvar
              </button>
            </form>
          </div>
        </main>

        <footer className="footer">
        <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
      </footer>
      </div>
    </div>
    </div>
  );
};

export default ClientePage;
