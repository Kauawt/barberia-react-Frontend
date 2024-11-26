"use client";

import React, { useState } from "react";
import { login, getUsuarios } from "@/services/APIService";

const TestePage = () => {
  const [email, setEmail] = useState("teste@exemplo.com"); 
  const [senha, setSenha] = useState("teste1234@T"); 
  const [usuarios, setUsuarios] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      console.log("Tentando login com:", email, senha);
      const response = await login({ email, senha });
      console.log("Resposta do login:", response.data);
      const token = response.data.access_token;
  
      if (token) {
        localStorage.setItem("token", token);
        alert("Login bem-sucedido! Token salvo no localStorage.");
      } else {
        throw new Error("Token não retornado pela API.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Erro no login. Verifique as credenciais e tente novamente.");
    }
  };

  const handleGetUsuarios = async () => {
    try {
      const usuariosResponse = await getUsuarios();
      setUsuarios(JSON.stringify(usuariosResponse, null, 2));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro("Erro ao buscar usuários. Verifique o console.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de API</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Login</h2>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fazer Login
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Buscar Usuários</h2>
        <button
          onClick={handleGetUsuarios}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Buscar Usuários
        </button>
        {usuarios && (
          <pre className="mt-4 bg-gray-100 p-4 rounded">
            {usuarios}
          </pre>
        )}
      </div>

      {erro && <div className="text-red-500 mt-4">{erro}</div>}
    </div>
  );
};

export default TestePage;
