import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getClienteById, updateCliente } from "../services/APIService";
import Link from "next/link";

const PerfilPage = () => {
  const [nomeCliente, setNomeCliente] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [dataNascimentoCliente, setDataNascimentoCliente] = useState<string>("");
  const [enderecoCliente, setEnderecoCliente] = useState<string>("");
  const [telefoneCliente, setTelefoneCliente] = useState<string>("");
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  //const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      const token = localStorage.getItem("token");
      const storedClienteId = localStorage.getItem("id");
      if (!token || !storedRole || !storedClienteId) {
        router.push("/login");
        return;
      }

      //setRole(storedRole);
      setClienteId(Number(storedClienteId));
      setIsLoading(false);
    }
  }, [router, isLoading]);
  
useEffect(() => {
  if (clienteId !== null) {
    const fetchCliente = async () => {
      try {
        const response = await getClienteById(clienteId);
        setNomeCliente(response.nomeCliente);
        setemail(response.email);
        setDataNascimentoCliente(response.dataNascimentoCliente);
        setEnderecoCliente(response.enderecoCliente);
        setTelefoneCliente(response.telefoneCliente);
      } catch (error) {
        console.error("Erro ao carregar os dados do cliente", error);
        setErro("Erro ao carregar os dados do cliente.");
      }
    };
    if (!isLoading) {
      fetchCliente();
    }
  } else {
    setErro("ID do cliente não encontrado.");
  }
}, [isLoading, clienteId]);

if (isLoading) {
  return <div>Carregando...</div>;
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (clienteId === null) {
      return;
    }
  
    try {
      const clienteAtualizado = {
        id: clienteId,
        nomeCliente,
        email,
        dataNascimentoCliente,
        senhaCliente: "",
        CPFCliente: "",
        enderecoCliente,
        telefoneCliente,
        chaveSeguraCliente: "",
      };
  
      await updateCliente(clienteId, clienteAtualizado);
      setMensagem("Dados atualizados com sucesso!");
      setMensagemTipo("sucesso");
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const MenuItems =  () => {
    const role = localStorage.getItem("role");

    if(role === "cliente"){
      return(
        <>
          <li><Link href="/home"><a className="nav-link">Home</a></Link></li>
          <li><Link href="/agendamento"><a className="nav-link">Agendamento</a></Link></li>
          <li><Link href="/perfil"><a className="nav-link">Perfil</a></Link></li>
          <li><Link href="/ajuda"><a className="nav-link">Ajuda</a></Link></li>
          <li><Link href="/sobre"><a className="nav-link">Sobre Nós</a></Link></li>
        </>
      );
    }
    if(role === "admin"){
      return(
        <>
           <li><Link href="/home"><a className="nav-link">Home</a></Link></li>
          <li><Link href="/agendamento"><a className="nav-link">Agendamento</a></Link></li>
          <li><Link href="/servicos"><a className="nav-link">Serviços</a></Link></li>
          <li><Link href="/cadastro"><a className="nav-link">Cadastro</a></Link></li>
          <li><Link href="/ajuda"><a className="nav-link">Ajuda</a></Link></li>
          <li><Link href="/sobre"><a className="nav-link">Sobre Nós</a></Link></li>
        </>
      );
    }
    return null;
  }
  return (
    <div className="telafundo-custom"> {}
      {}
      <header className="header">
    <div className="container">
      <nav>
        <ul className="header-nav">
          {MenuItems()}
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
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
