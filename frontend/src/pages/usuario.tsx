import React, { useState } from "react";
import { createUsuario, getUsuarios } from "../services/APIService";

const UsuarioPage = () => {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salario, setSalario] = useState('');
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | null>(null);

  // Convertendo a data DD/MM/YYYY para YYYY-MM-DD (banco de dados)
  const converterDataParaBanco = (data: string): string => {
    const partes = data.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    
    return `${ano}-${mes}-${dia}`;
  };

  const formatarData = (data: string): string => {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  };

  
  const exibirMensagem = (mensagem: string, tipo: "sucesso" | "erro") => {
    setMensagem(mensagem);
    setMensagemTipo(tipo);
    setTimeout(() => {
      setMensagem(null);
      setMensagemTipo(null);
    }, 4500);
  };

  const isCpfValido = (cpf: string) => {
    return cpf.length === 11 && /^\d+$/.test(cpf);
  };

  const handleNextStep = () => {
    if (!isCpfValido(cpf)) {
      alert("CPF inválido");
      return;
    }
    setStep(2); 
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de senha forte
    const isSenhaForte = (senha: string) => {
      const regex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
      return regex.test(senha);
    };

    if (!isSenhaForte(senha)) {
      exibirMensagem("A senha deve conter pelo menos 8 caracteres, incluindo 1 número, 1 letra minúscula e 1 símbolo.", "erro");
      return;
    }
    //const dataNascFormatada = converterDataParaBanco(dataNascimento);
    try {
      await createUsuario({
        nome,
        email,
        senha,
        CPF: cpf,
        dataNascimento,
        //dataNascimento: dataNascFormatada, 
        endereco,
        telefone,
        salario,
      });
      exibirMensagem("Usuário criado com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.response) {
        // Detalhes do erro vindo da API
        console.error("Erro de API:", error.response.data);
        exibirMensagem(`Erro: ${error.response.data.message}`, "erro");
      } else {
        // Caso não tenha resposta da API
        console.error("Erro de rede:", error.message);
        exibirMensagem("Erro ao criar usuário. Tente novamente mais tarde.", "erro");
      }
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
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
              <main className="mt-10 flex flex-col items-center w-full">
                <h2 className="text-4xl font-semibold text-white">Usuário</h2>
                <div className="mt-6 max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-black">
                  {}
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
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm">Nome</label>
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
                    <label htmlFor="email" className="block text-sm">Email</label>
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
                    <label htmlFor="password" className="block text-sm">Senha</label>
                    <input
                      type="password"
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cpf" className="block text-sm">CPF</label>
                    <input
                      type="text"
                      id="cpf"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none"
                      required
                      maxLength={11}
                      
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Avançar
                  </button>
                </div>
              </main>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex flex-col items-center min-h-screen p-4 text-white">
              <main className="mt-10 flex flex-col items-center w-full">
                <h2 className="text-4xl font-semibold text-white">Usuário</h2>
                <div className="mt-6 max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-black">
                  {}
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
                  <div className="mb-4">
                    <label htmlFor="dataNascimento" className="block text-sm">Data Nascimento</label>
                    <input
                      type="text"
                      id="dataNascimento"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="endereco" className="block text-sm">Endereço</label>
                    <input
                      type="text"
                      id="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="telefone" className="block text-sm">Telefone</label>
                    <input
                      type="text"
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="salario" className="block text-sm">Salário</label>
                    <input
                      type="text"
                      id="salario"
                      value={salario}
                      onChange={(e) => setSalario(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Criar Usuário
                  </button>
                  {}
                <div className="text-center mb-4">
                  <span
                    onClick={() => setStep(1)}
                    className="text-blue-500 text-sm cursor-pointer hover:underline"
                  >
                    Voltar
                  </span>
                </div>
                </div>
              </main>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
  <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">Lista de Usuários</h2>
  <table className="w-full text-left table-auto">
    <thead>
      <tr className="border-b">
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>CPF</th>
        <th>Data de Nascimento</th>
        <th>Endereço</th>
        <th>Telefone</th>
        <th>Salário</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {usuarios.map((usuario) => (
        <tr key={usuario.id} className="border-b">
          <td>{usuario.id}</td>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>{usuario.CPF}</td>
          <td>{usuario.dataNascimento}</td>
          <td>{usuario.endereco}</td>
          <td>{usuario.telefone}</td>
          <td>R$ {usuario.salario}</td>
          <td>
            <button
              onClick={() => handleDeleteUsuario(usuario.id)}
              className="text-red-500 hover:underline"
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </form>
        )}
      </div>
    </div>
  );
};

export default UsuarioPage;
