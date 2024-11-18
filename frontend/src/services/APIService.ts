/*import axios from 'axios';

// Configuração da instância do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
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

const getAgendamentos = async () => {
  try {
    const response = await api.get('/agendamento');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar agendamentos', error);
    throw error;
  }
};

const getAgendamentoById = async (id: number) => {
  try {
    const response = await api.get(`/agendamento/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Erro ao buscar agendamento com id ${id}`, error);
    throw error;
  }
};

const createAgendamento = async (agendamentoData: any) => {
  try {
    const response = await api.post('/agendamento', agendamentoData); 
    return response.data; 
  } catch (error) {
    console.error('Erro ao criar agendamento', error);
    throw error;
  }
};

const updateAgendamento = async (id: number, agendamentoData: any) => {
  try {
    const response = await api.patch(`/agendamento/${id}`, agendamentoData); 
    return response.data; 
  } catch (error) {
    console.error('Erro ao atualizar agendamento', error);
    throw error;
  }
};

const deleteAgendamento = async (id: number) => {
  try {
    const response = await api.delete(`/agendamento/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Erro ao remover agendamento', error);
    throw error;
  }
};

export { 
  api,
  getAgendamentos, 
  getAgendamentoById, 
  createAgendamento, 
  updateAgendamento, 
  deleteAgendamento 
};*/


