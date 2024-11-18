// src/app/login/page.tsx
"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Teste
    if (email === "admin@admin.com" && senha === "12345") {
      router.push("/cliente"); 
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="relative min-h-screen">
  {}
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
    style={{ backgroundImage: "url('/images/wallpaper_jp.png')" }}
  />

  {}
  <div className="flex justify-center items-center min-h-screen z-10 relative">
    <div className="w-full max-w-xs p-6 bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-lg backdrop-blur-sm">
      <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
      {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            className="w-full p-2 border border-gray-300 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
      <div className="text-center mt-4">
        <button className="text-blue-500">Cadastrar</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
