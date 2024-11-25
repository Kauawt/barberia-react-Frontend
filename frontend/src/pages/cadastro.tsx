"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUsuario } from "../services/APIService"; // Certifique-se de importar o método de API
import { AxiosError } from 'axios';
import axios from 'axios';

const CadastroPage = () => {
  const [step, setStep] = useState(1); // Controla a etapa do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState(""); // Estado para exibir erros
  const router = useRouter();

  const handleNextStep = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }
    setStep(2); // Avança para a próxima etapa
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const usuarioData = {
      nome,
      email,
      senha,
    };
  
    console.log('Dados enviados para a API:', usuarioData);  // Verifique se está mostrando os dados corretamente
  
    try {
      // Usando a variável de ambiente para definir a URL da API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, usuarioData);
      if (response) {
        alert('Cadastro realizado com sucesso!');
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);  // Log completo do erro
      alert('Erro ao realizar o cadastro. Tente novamente.');
    }
  };
  
  

  return (
    <div className="telafundo-custom min-h-screen">
      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
        <main className="mt-10 flex flex-col items-center w-full">
          <h2 className="text-4xl font-semibold text-white">Cadastro</h2>

          {/* Formulário */}
          <div className="mt-6 max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-black">
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
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
                    placeholder="Digite seu email"
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
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmarSenha" className="block text-sm">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Continuar
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="telefone" className="block text-sm">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Digite seu telefone"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endereco" className="block text-sm">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dataNascimento" className="block text-sm">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cpf" className="block text-sm">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF"
                    required
                  />
                </div>
                {erro && <p className="text-red-500 text-sm">{erro}</p>} {/* Exibe o erro */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
                >
                  Finalizar Cadastro
                </button>
                {/* Botão de voltar */}
                <div className="text-center mb-4">
                  <span
                    onClick={() => setStep(1)} // Volta ao step 1
                    className="text-blue-500 text-sm cursor-pointer hover:underline"
                  >
                    Voltar
                  </span>
                </div>
              </form>
            )}
          </div>
        </main>

        <footer className="footer">
          <p>© 2024 JP Cortes Barbearia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default CadastroPage;
