// Página de chamada das rotas com o backend

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// interface com os campos do Usuário
interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  CPF: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  salario: string;
}
// interface com os campos do Cliente
interface ClienteData {
  id: number;
  nomeCliente: string;
  email: string;
  senhaCliente: string;
  CPFCliente: string;
  dataNascimentoCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  chaveSeguraCliente: string;
}

// Rota de Login
/*const login = async ({ email, senha }: { email: string; senha: string }) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      senha: senha,
    });
    const {acess_token, role} = response.data;
    return response;
  } catch (error) {
    console.error("Erro na API de login:", error);
    throw error;
  }
};

*/ // testando token e role
const login = async ({ email, senha }: { email: string; senha: string }) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    const { acess_token, role, id } = response.data;

    // Verifique os valores retornados
    console.log("Token:", acess_token);
    console.log("Role:", role);

    // Armazene apenas se ambos existirem
    if (acess_token) {
      localStorage.setItem("token", acess_token);
    }

    if (role) {
      localStorage.setItem("role", role);
    }

    if(id){
      localStorage.setItem("id", id);

    }

    return response;
  } catch (error) {
    console.error("Erro na API de login:", error);
    throw error;
  }
};

// Rotas Usuário
const createUsuario = async (usuarioData: UsuarioData) => {
  try {
    const response = await api.post("/usuario", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    throw error;
  }
};

const getUsuarios = async () => {
  try {
    const response = await api.get("/usuario");
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar usuários", error);
    throw error;
  }
};

const updateUsuario = async (id: number, usuarioData: UsuarioData) => {
  try {
    const response = await api.put(`/usuario/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    throw error;
  }
};

const deleteUsuario = async (id: number) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir usuário", error);
    throw error;
  }
};

export const resetPassword = async ({
  email,
  senha,
}: {
  email: string;
  senha: string;
}) => {
  try {
    const response = await api.post("/auth/reset-password", { email, senha });
    return response.data;
  } catch (error) {
    console.error("Erro ao redefinir senha", error);
    throw error;
  }
};

// Rotas Serviços
const getServicos = async () => {
  try {
    const response = await api.get("/servicos");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar serviços", error);
    throw error;
  }
};

const createServico = async (servicoData: {
  nomeServico: string;
  descricaoServico: string;
  precoServico: number;
  duracaoServico: number;
  statusServico: boolean;
}) => {
  try {
    const response = await api.post("/servicos", servicoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar serviço", error);
    throw error;
  }
};

const deleteServico = async (id: number) => {
  try {
    const response = await api.delete(`/servicos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir serviço", error);
    throw error;
  }
};

// Rotas Cliente
const createCliente = async (clienteData: ClienteData) => {
  try {
    const response = await api.post("/clientes", clienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente", error);
    throw error;
  }
};

const updateCliente = async (id: number, clienteData: ClienteData) => {
  try {
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cliente", error);
    throw error;
  }
};

// Buscar os dados do cliente
const getClienteById = async (id: number) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
};

const getClientes = async (): Promise<ClienteData[]> => {
  try {
    const response = await api.get("/clientes");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    throw error;
  }
};
// Rotas de Agendamento
const getAgendamentos = async () => {
  try {
    const response = await api.get("/agendamento");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar agendamentos", error);
    throw error;
  }
};

const createAgendamento = async (agendamentoData: {
  usuarioId: number;
  clienteId: number;
  dataAgendamento: string;
  solicitacoes: { servicoId: number; quantidade: number }[];
}) => {
  try {
    const response = await api.post("/agendamento", agendamentoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar agendamento", error);
    throw error;
  }
};
const deleteAgendamento = async (id: number) => {
  try {
    const response = await api.delete(`/agendamento/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir agendamento", error);
    throw error;
  }
};

export {
  login,
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getServicos,
  createServico,
  deleteServico,
  createCliente,
  updateCliente,
  getAgendamentos,
  createAgendamento,
  deleteAgendamento,
  getClienteById,
  getClientes,
};
