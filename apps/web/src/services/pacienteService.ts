import axios from 'axios';

export interface Paciente {
  id: string;
  name: string;
  email: string;
  photo_url: string | null;
  cpf: string;
  gender: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  initial_observations: string | null;
  history: string | null;
  status: 'ATIVO' | 'ACOMPANHAMENTO' | 'ALTA' | 'INATIVO';
  psicologo_responsavel_id: string | null;
}

// Normalizar a URL do backend
const getBaseURL = () => {
  const envUrl = process.env.NEXT_PUBLIC_DB_HOST;
  if (!envUrl) return 'http://localhost:3001';
  
  let url = envUrl.trim();
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `http://${url}`;
  }
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    url = url.replace('https://', 'http://');
  }
  
  return url;
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreatePacienteData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  gender: 'MASCULINO' | 'FEMININO' | 'OUTRO';
}

export const pacienteService = {
  async listPacientes(token?: string): Promise<Paciente[]> {
    try {
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      } : {};
      const response = await api.get<Paciente[]>('/users/patients', config);
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao listar pacientes:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('O servidor não respondeu. Verifique se o backend está rodando.');
      } else {
        throw new Error(error.message || 'Erro ao fazer requisição');
      }
    }
  },

  async createPaciente(data: CreatePacienteData, token?: string): Promise<any> {
    try {
      const config = token ? {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      } : {};
      const response = await api.post('/users/patients', data, config);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar paciente:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('O servidor não respondeu. Verifique se o backend está rodando.');
      } else {
        throw new Error(error.message || 'Erro ao fazer requisição');
      }
    }
  },
};

