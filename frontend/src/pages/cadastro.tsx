"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCliente } from "../services/APIService";


const CadastroPage = () => {
  const [step, setStep] = useState(1); 
  const [nomeCliente, setNomeCliente] = useState("");
  const [email, setemail] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [confirmarSenhaCliente, setConfirmarSenhaCliente] = useState("");
  const [chaveSeguraCliente, setchaveSeguraCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [enderecoCliente, setEnderecoCliente] = useState("");
  const [dataNascimentoCliente, setDataNascimentoCliente] = useState("");
  const [CPFCliente, setCpfCliente] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(null);
  const router = useRouter();

  // Função para converter a data de '11/11/2003' para '2003-11-11', conforme o banco
  /*const formatarData = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 2) value = value.replace(/(\d{2})(\d)/, '$1/$2'); 
    if (value.length > 5) value = value.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    setDataNascimentoCliente(value);
  };

  const convertDataFormato = (data: string) => {
    const partes = data.split('/'); 
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  // Função para formatar cpf XXX.XXX.XXX-XX em XXXXXXXXXXX (insert no banco de dados)
  const CpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 3) value = value.replace(/(\d{3})(\d)/, '$1.$2');
    if (value.length > 6) value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (value.length > 9) value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    setCpfCliente(value);
  };*/

  const exibirMensagem = (mensagem: string, tipo: "sucesso" | "erro") => {
    setMensagem(mensagem);
    setMensagemTipo(tipo);
    setTimeout(() => {
      setMensagem(null);
      setMensagemTipo(null);
    }, 4500);
  };

  const isCpfValido = (CPFCliente: string) => {
    return CPFCliente.length === 11 && /^\d+$/.test(CPFCliente);
  };

  const handleNextStep = () => {
    if (senhaCliente !== confirmarSenhaCliente) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de senha forte
    const isSenhaForte = ( senhaCliente: string) => {
      const regex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
      return regex.test(senhaCliente);
    };

    if (!isSenhaForte(senhaCliente)) {
      exibirMensagem("A senha deve conter pelo menos 8 caracteres, incluindo 1 número, 1 letra minúscula e 1 símbolo.", "erro");
      return;
    }
    try {
      await createCliente({
        nomeCliente,
        email,
        senhaCliente,
        CPFCliente,
        dataNascimentoCliente,
        enderecoCliente,
        telefoneCliente,
        chaveSeguraCliente,
      });
      exibirMensagem("Cliente criado com sucesso!", "sucesso");
      router.push('/login')
    } catch (error: any) {
      if (error.response) {
        // Imprimir logs de erro da API
        exibirMensagem(`Erro: ${error.response.data.message}`, "erro");
      } else {
        exibirMensagem("Erro ao criar Cliente. Tente novamente mais tarde.", "erro");
      }
    }
  };

  return (
    <div className="telafundo-custom min-h-screen">
      {}
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
      <nav>
      <ul className="header-nav">
          <li><a href="/login" className="nav-link">Login</a></li>
        </ul>
      </nav>
        <main className="mt-10 flex flex-col items-center w-full">
          <h2 className="text-4xl font-semibold text-white">Cadastro</h2>

          {}
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
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
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
                    onChange={(e) => setemail(e.target.value)}
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
                    value={senhaCliente}
                    onChange={(e) => setSenhaCliente(e.target.value)}
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
                    value={confirmarSenhaCliente}
                    onChange={(e) => setConfirmarSenhaCliente(e.target.value)}
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
                    value={telefoneCliente}
                    onChange={(e) => setTelefoneCliente(e.target.value)}
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
                    value={enderecoCliente}
                    onChange={(e) => setEnderecoCliente(e.target.value)}
                    placeholder="Digite seu endereço"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dataNascimento" className="block text-sm">
                    Data de Nascimento
                  </label>
                  <input
                    type="text"
                    id="dataNascimento"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={dataNascimentoCliente}
                    onChange={(e) => setDataNascimentoCliente(e.target.value)}
                    //onChange={formatarData}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cpf" className="block text-sm">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    value={CPFCliente}
                    //onChange={CpfChange}
                    onChange={(e) => setCpfCliente(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none"
                    required
                    maxLength={14}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="chaveSeguranca" className="block text-sm">
                    Chave de Segurança
                  </label>
                  <input
                    type="text"
                    id="chaveSeguranca"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={chaveSeguraCliente}
                    onChange={(e) => setchaveSeguraCliente(e.target.value)}
                    required
                  />
                  </div>
                {erro && <p className="text-red-500 text-sm">{erro}</p>} {}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
                >
                  Finalizar Cadastro
                </button>
                {}
                <div className="text-center mb-4">
                  <span
                    onClick={() => setStep(1)} 
                    className="text-blue-500 text-lg cursor-pointer hover:underline"
                  >
                    Voltar
                  </span>
                </div>
                {mensagem && (
            <div
              className={`${
                mensagemTipo === "sucesso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              } border border-solid p-2 rounded mb-4`}
            >
              {mensagem}
            </div>
          )}
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
