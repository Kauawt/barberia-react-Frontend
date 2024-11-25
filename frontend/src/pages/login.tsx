"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/APIService"; // Importe a função de login do serviço

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [redefinirSenha, setRedefinirSenha] = useState(false); // Controle de redefinição
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      console.log('Enviando dados para login:', { email, senha });  // Verifique os dados
      const response = await login({ email, senha });
  
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        router.push("/home");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch (error) {
      setErro("Erro ao fazer login. Tente novamente.");
      console.error(error);
    }
  };

  const handleCadastrar = () => {
    router.push("/cadastro");
  };

  return (
    <div className="relative min-h-screen">
      {/* Imagem de fundo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/wallpaper_jp.png')" }}
      />

      {/* Conteúdo */}
      <div className="flex justify-center items-center min-h-screen z-10 relative">
        <div className="w-full max-w-sm p-12 bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-lg backdrop-blur-sm">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <p className="mb-4 text-sm text-gray-700">
            Já é nosso cliente? Faça login com seu e-mail e senha. <br /> Ainda não tem
            uma conta?{" "}
            <span
              onClick={handleCadastrar}
              className="text-sm text-blue-500 cursor-pointer"
            >
              Cadastrar
            </span>
            .
          </p>
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
            <div className="mb-2">
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
            <div className="text-right mb-4">
              <span
                onClick={() => setRedefinirSenha(true)}
                className="text-xs text-blue-500 cursor-pointer"
              >
                Esqueci minha senha
              </span>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Modal de redefinição de senha */}
      {redefinirSenha && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Redefinir Senha</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Senha redefinida com sucesso!");
                setRedefinirSenha(false);
              }}
            >
              <div className="mb-4">
                <label htmlFor="senhaAtual" className="block text-sm font-medium mb-2">
                  Chave de Segurança
                </label>
                <input
                  type="password"
                  id="chaveSeguranca"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite sua chave de segurança"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="novaSenha" className="block text-sm font-medium mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="novaSenha"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Digite sua nova senha"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmarNovaSenha" className="block text-sm font-medium mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  id="confirmarNovaSenha"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Confirme sua nova senha"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Redefinir Senha
              </button>
              <button
                type="button"
                className="w-full mt-2 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                onClick={() => setRedefinirSenha(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
