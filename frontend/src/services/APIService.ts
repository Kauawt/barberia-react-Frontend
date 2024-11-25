// src/services/APIService.ts
import axios from 'axios';

// Configuração da instância do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pega o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
});

// Atualizando a tipagem para permitir dados parciais
interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  cpf?: string;
}


// Função para fazer login
const login = async (credentials: { email: string; senha: string }) => {
  try {
    const response = await api.post('/auth/login', credentials); // Requisição de login
    return response.data; // Retorna o token de autenticação
  } catch (error) {
    console.error('Erro ao fazer login', error);
    throw error; // Lança o erro para ser tratado no frontend
  }
};

// Função de criação de usuário (agora aceita dados parciais)
const createUsuario = async (usuarioData: UsuarioData) => {
  try {
    const response = await api.post('/usuario', usuarioData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário', error);
    throw error;
  }
};

const getUsuarios = async () => {
  try {
    const response = await api.get('/usuario');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar usuários', error);
    throw error;
  }
};

const updateUsuario = async (id: number, usuarioData: { nome: string; email: string; senha: string }) => {
  try {
    const response = await api.put(`/usuario/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário', error);
    throw error;
  }
};

const deleteUsuario = async (id: number) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir usuário', error);
    throw error;
  }
};

// Exportando as funções
export { 
  login,          // Adiciona a função de login
  createUsuario, 
  getUsuarios, 
  updateUsuario, 
  deleteUsuario 
};
