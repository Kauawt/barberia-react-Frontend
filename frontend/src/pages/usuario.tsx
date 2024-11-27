"use client";
import React, { useState } from "react";
import {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../services/APIService";

const UsuarioPage = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null); // Estado para mensagem
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(
    null
  ); // Tipo da mensagem

  const exibirMensagem = (mensagem: string, tipo: "sucesso" | "erro") => {
    setMensagem(mensagem);
    setMensagemTipo(tipo);
    setTimeout(() => {
      setMensagem(null);
      setMensagemTipo(null);
    }, 4500); // Oculta a mensagem após 3 segundos
  };
  // Validação de senha forte
  const isSenhaForte = (senha: string) => {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar senha antes de enviar para a API
    if (!isSenhaForte(senha)) {
      exibirMensagem("A senha deve conter pelo menos 8 caracteres, incluindo 1 número, 1 letra minúscula e 1 símbolo.","erro");
      return;
    }

    try {
      await createUsuario({ nome, email, senha });
      exibirMensagem("Usuário criado com sucesso!", "sucesso");
      setNome("");
      setEmail("");
      setSenha("");
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      exibirMensagem("Erro ao criar usuário. Verifique os dados.", "erro");
    }
  };

  return (
    <div className="telafundo-custom">
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
      <div className="relative min-h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/wallpaper6.png')",
            opacity: 0.9,
          }}
        />
        <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
          <main className="mt-10 flex flex-col items-center w-full">
            <h2 className="text-4xl font-semibold text-white">Usuário</h2>
            <div className="mt-6 max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-black">
              {/* Mensagem de feedback */}
              {mensagem && (
                <div
                  className={`mb-4 p-2 text-center rounded ${
                    mensagemTipo === "sucesso"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {mensagem}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
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
                  <label htmlFor="password" className="block text-sm">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Criar Usuário
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UsuarioPage;
