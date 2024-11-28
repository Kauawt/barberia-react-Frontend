import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getClienteById, updateCliente } from "../services/APIService";

const PerfilPage = () => {
  const [nomeCliente, setNomeCliente] = useState<string>("");
  const [emailCliente, setEmailCliente] = useState<string>("");
  const [dataNascimentoCliente, setDataNascimentoCliente] = useState<string>("");
  const [enderecoCliente, setEnderecoCliente] = useState<string>("");
  const [telefoneCliente, setTelefoneCliente] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCliente = async () => {
      if (clienteId !== null) {
        try {
          const response = await getClienteById(clienteId); 
          setClienteId(response.id);
          setNomeCliente(response.nomeCliente);
          setEmailCliente(response.emailCliente);
          setDataNascimentoCliente(response.dataNascimentoCliente);
        } catch (error) {
          console.error("Erro ao carregar os dados do cliente", error);
          setErro("Erro ao carregar os dados do cliente.");
        }
      } else {
        setErro("ID do cliente não encontrado.");
      }
    };
  
    fetchCliente();
  }, [clienteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clienteId === null) {
      setMensagem("Erro: ID do cliente não encontrado.");
      setMensagemTipo("erro");
      return;
    }

    try {
      await updateCliente(clienteId, { nomeCliente, emailCliente, dataNascimentoCliente, senhaCliente: "", CPFCliente: "", enderecoCliente: "", telefoneCliente: "", chaveSeguraCliente: "" });
      setMensagem("Dados atualizados com sucesso!");
      setMensagemTipo("sucesso");
    } catch (error) {
      setMensagem("Erro ao atualizar os dados. Tente novamente.");
      setMensagemTipo("erro");
    }
  };

  return (
    <div className="telafundo-custom min-h-screen flex flex-col">
      <header className="header">
        <div className="container">
          <nav>
            <ul className="header-nav flex justify-between items-center">
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

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold text-white mb-6">Meu Perfil</h1>

        {mensagem && (
          <p className={`mb-4 ${mensagemTipo === "sucesso" ? "text-green-500" : "text-red-500"}`}>
            {mensagem}
          </p>
        )}
        {erro && <p className="text-red-500">{erro}</p>}

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-11/12 max-w-4xl overflow-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nomeCliente" className="block text-lg font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="nomeCliente"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emailCliente" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="emailCliente"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dataNascimentoCliente" className="block text-lg font-medium text-gray-700">Data de Nascimento</label>
              <input
                type="date"
                id="dataNascimentoCliente"
                value={dataNascimentoCliente}
                onChange={(e) => setDataNascimentoCliente(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="enderecoCliente" className="block text-lg font-medium text-gray-700">Endereço</label>
              <input
                type="text"
                id="enderecoCliente"
                value={enderecoCliente}
                onChange={(e) => setEnderecoCliente(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="telefoneCliente" className="block text-lg font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                id="telefoneCliente"
                value={telefoneCliente}
                onChange={(e) => setTelefoneCliente(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md">
                Atualizar Dados
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
