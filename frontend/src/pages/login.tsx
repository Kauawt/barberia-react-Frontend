"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login, redefinirSenha, getClienteByEmail } from "../services/APIService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [chaveSeguraCliente, setChaveSeguraCliente] = useState("");
  const [mostrarCamposSenha, setMostrarCamposSenha] = useState(false);
  const [mostrarCamposEmail, setMostrarCamposEmail] = useState(false);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [redefineSenha, setRedefinirSenha] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(null);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email: email, senha: senha });
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        router.push("/home");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch (error) {
      setErro("Erro ao fazer login. Tente novamente.");
      console.error(error);
    }
  };

  if (clienteId) {
    console.log("ID do cliente:", clienteId); // Aqui você pode fazer o que for necessário com o clienteId
  } else {
    console.log("Cliente não encontrado ou clienteId não está definido");
  }
  const buscarClientePorEmail = async (e: React.FormEvent) => {
    e.preventDefault();
  if (!email) {
    if (mensagem && mensagemTipo) {
    setMensagem("Por favor, insira um e-mail.");
    setMensagemTipo("erro");
    return;
  }}

  try {
    console.log("Buscando cliente pelo e-mail:", email);
    const id = await getClienteByEmail(email);
    console.log("ID do cliente encontrado:", id);
    if (id) {
      setClienteId(id as string); // Armazena o ID do cliente
      setMostrarCamposSenha(true); // Exibe os campos de senha e chave de segurança após encontrar o ID
    } else {
      throw new Error("Cliente não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    setMensagem("E-mail não encontrado. Tente novamente.");
    setMensagemTipo("erro");
  }
};

const redefinirPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  // Verificar se as senhas coincidem
  if (novaSenha !== confirmarNovaSenha) {
    alert("As senhas não coincidem");
    return;
  }
  const isSenhaForte = ( novaSenha: string) => {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(novaSenha);
  };
  if (!isSenhaForte(novaSenha)) {
    alert("A senha deve conter pelo menos 8 caracteres, incluindo 1 número, 1 letra minúscula e 1 símbolo.");
    return;
  }


  try {
    await redefinirSenha(chaveSeguraCliente, novaSenha);
    router.push('/home');
    alert("Senha redefinida com sucesso!");
    setRedefinirSenha(false);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
};
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/wallpaper_jp.png')" }}
      />
      <div className="flex justify-center items-center min-h-screen z-10 relative">
        <div className="w-full max-w-sm p-12 bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-lg backdrop-blur-sm">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <p className="mb-4 text-xs text-black-700">
            Já é nosso cliente? Faça login com seu e-mail e senha. <br />
            Ainda não tem uma conta?{" "}
            <span
              onClick={() => router.push("/cadastro")}
              className="text-xs text-blue-600 cursor-pointer"
            >
              Cadastrar
            </span>
            .
          </p>
          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}
          
         {/* Formulário de Login */}
{!mostrarCamposEmail && !redefineSenha && (
  <form onSubmit={handleLogin}>
    <div className="mb-4">
      <label htmlFor="email" className="text-xs text-black">
        E-mail
      </label>
      <input
        type="email"
        id="email"
        className="w-full p-2 border border-black-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="mb-2">
      <label htmlFor="senha" className="text-xs text-black">
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
        onClick={() => setMostrarCamposEmail(true)} // Aqui você muda para true para exibir o formulário de e-mail
        className="text-xs text-blue-600 cursor-pointer"
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
)}

{/* Campo de e-mail e botão "Continuar" */}
{mostrarCamposEmail && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
    <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Redefinir Senha</h3>
      <form onSubmit={buscarClientePorEmail}>
        <div className="mb-4">
          <label htmlFor="email" className="text-xs text-black">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-black-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text-right mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Tela de redefinição de senha */}
{mostrarCamposSenha && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
    <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Redefinir Senha</h3>
      <form onSubmit={redefinirPassword}>
        <div className="mb-4">
          <label htmlFor="chaveSeguranca" className="block text-sm font-medium mb-2">
            Chave de Segurança
          </label>
          <input
            type="text"
            id="chaveSeguranca"
            className="w-full p-2 border border-gray-300 rounded"
            value={chaveSeguraCliente}
            onChange={(e) => setChaveSeguraCliente(e.target.value)}
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
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
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
            value={confirmarNovaSenha}
            onChange={(e) => setConfirmarNovaSenha(e.target.value)}
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
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default LoginPage;