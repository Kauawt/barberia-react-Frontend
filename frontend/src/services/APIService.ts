
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  cpf?: string;
}

const login = async ({ email, senha }: { email: string; senha: string }) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      senha: senha,
    });
    return response;
  } catch (error) {
    console.error("Erro na API de login:", error);
    throw error;
  }
};

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
  
    console.log('Resposta da API:', response.data);
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

export const resetPassword = async ({ email, senha }: { email: string; senha: string }) => {
  try {
    const response = await api.post('/auth/reset-password', { email, senha });
    return response.data;
  } catch (error) {
    console.error('Erro ao redefinir senha', error);
    throw error;
  }
};

export { 
  login, 
  createUsuario, 
  getUsuarios, 
  updateUsuario, 
  deleteUsuario 
};
