// src/lib/mockData.ts

// --- Interfaces ---
export interface PatientListItem {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
}

export interface PatientDetail {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
  personalInfo: {
    email: string;
    phone: string;
    birthDate: string;
    address: string;
  };
  sessions: {
    id: string;
    date: string;
    type: string;
    notes: string;
    status: 'Concluída' | 'Confirmada' | 'Agendada' | 'Online';
  }[];
}

// --- Dados Mockados ---
export const mockPatientsList: PatientListItem[] = [
  { id: 'abel-ferreira', name: 'Abel Ferreira', avatar: '/abel.jpg', lastSession: '27/11/2021' },
  { id: 'joao-souza', name: 'João Souza', avatar: '/patient_male_avatar.jpg', lastSession: '01/11/2023' },
  { id: 'maria-oliveira', name: 'Maria Oliveira', avatar: '/patient_female_avatar.jpg', lastSession: '15/09/2023' },
  { id: 'carlos-pereira', name: 'Carlos Pereira', avatar: '/patient_male_avatar.jpg', lastSession: '10/10/2023' },
  { id: 'sofia-fernandes', name: 'Sofia Fernandes', avatar: '/patient_female_avatar.jpg', lastSession: '05/11/2023' },
  // Adicione Ana Silva aqui para a lista também, se quiser
  { id: 'ana-silva', name: 'Ana Silva', avatar: '/ana_silva_avatar.jpg', lastSession: '25/10/2023' },
];

export const mockPatientsDetails: PatientDetail[] = [
  {
    id: 'ana-silva',
    name: "Ana Silva",
    avatar: "/ana_silva_avatar.jpg",
    lastSession: "25/10/2023",
    personalInfo: {
      email: "ana.silva@email.com",
      phone: "(11) 98765-4321",
      birthDate: "15/05/1990",
      address: "Rua Exemplo, 123 - São Paulo/SP",
    },
    sessions: [
      { id: "s1", date: "25 de Outubro de 2023", type: "Terapia Cognitivo-Comportamental", notes: "Foco no manejo de ansiedade e técnicas. Paciente relatou melhora na qualidade de sono.", status: "Concluída", },
      { id: "s2", date: "18 de Outubro de 2023", type: "Sessão Terapia Online", notes: "Discussão sobre metas e progressos da semana. Utilização de exercícios de relaxamento.", status: "Online", },
      { id: "s3", date: "11 de Outubro de 2023", type: "Terapia Cognitivo-Comportamental", notes: "Avaliação inicial e definição de plano de tratamento.", status: "Concluída", },
      { id: "s4", date: "04 de Novembro de 2023", type: "Sessão Terapia", notes: "Sessão agendada para acompanhamento.", status: "Agendada", },
    ],
  },
  {
    id: 'abel-ferreira',
    name: "Abel Ferreira",
    avatar: "/abel_avatar.jpg", // Certifique-se de ter esta imagem em public/ ou ajuste o path
    lastSession: "27/11/2021",
    personalInfo: {
      email: "abel.ferreira@email.com",
      phone: "(11) 97777-7777",
      birthDate: "15/12/1978",
      address: "Rua do Técnico, 7 - São Paulo/SP",
    },
    sessions: [
      { id: "af1", date: "27 de Novembro de 2021", type: "Avaliação Psicológica", notes: "Sessão inicial para avaliação do perfil e queixas. ", status: "Concluída", },
      { id: "af2", date: "03 de Dezembro de 2021", type: "Terapia Cognitivo-Comportamental", notes: "Foco em gestão de estresse e alta performance.", status: "Concluída", },
    ],
  },
  {
    id: 'joao-souza',
    name: "João Souza",
    avatar: "/patient_male_avatar.jpg",
    lastSession: "01/11/2023",
    personalInfo: {
      email: "joao.souza@email.com",
      phone: "(11) 99876-5432",
      birthDate: "20/03/1985",
      address: "Av. Principal, 456 - Rio de Janeiro/RJ",
    },
    sessions: [
      { id: "js1", date: "01 de Novembro de 2023", type: "Terapia de Casal", notes: "Sessão focada em comunicação e resolução de conflitos.", status: "Concluída", },
      { id: "js2", date: "25 de Outubro de 2023", type: "Terapia Individual", notes: "Discussão sobre metas de carreira e autoconfiança.", status: "Concluída", },
      { id: "js3", date: "08 de Novembro de 2023", type: "Sessão Agendada", notes: "Próxima sessão agendada.", status: "Agendada", },
    ],
  },
  {
    id: 'maria-oliveira',
    name: "Maria Oliveira",
    avatar: "/patient_female_avatar.jpg",
    lastSession: "15/09/2023",
    personalInfo: {
      email: "maria.oliveira@email.com",
      phone: "(11) 91234-5678",
      birthDate: "01/07/1992",
      address: "Rua das Flores, 789 - Belo Horizonte/MG",
    },
    sessions: [
      { id: "mo1", date: "15 de Setembro de 2023", type: "Terapia Breve Focada na Solução", notes: "Foco em estratégias para lidar com ansiedade social.", status: "Concluída", },
      { id: "mo2", date: "22 de Setembro de 2023", type: "Sessão Online", notes: "Revisão das estratégias e feedback sobre progresso.", status: "Online", },
    ],
  },
  {
    id: 'carlos-pereira',
    name: "Carlos Pereira",
    avatar: "/patient_male_avatar.jpg",
    lastSession: "10/10/2023",
    personalInfo: {
      email: "carlos.pereira@email.com",
      phone: "(11) 98765-1234",
      birthDate: "10/10/1975",
      address: "Av. Paulista, 1000 - São Paulo/SP",
    },
    sessions: [
      { id: "cp1", date: "10 de Outubro de 2023", type: "Aconselhamento Psicológico", notes: "Sessão de apoio para decisão de carreira.", status: "Concluída", },
      { id: "cp2", date: "17 de Outubro de 2023", type: "Sessão Presencial", notes: "Discussão sobre equilíbrio entre vida pessoal e profissional.", status: "Concluída", },
    ],
  },
  {
    id: 'sofia-fernandes',
    name: "Sofia Fernandes",
    avatar: "/patient_female_avatar.jpg",
    lastSession: "05/11/2023",
    personalInfo: {
      email: "sofia.fernandes@email.com",
      phone: "(11) 94321-8765",
      birthDate: "22/02/1995",
      address: "Praça da Sé, 50 - São Paulo/SP",
    },
    sessions: [
      { id: "sf1", date: "05 de Novembro de 2023", type: "Terapia de Apoio", notes: "Sessão para lidar com luto e perdas recentes.", status: "Concluída", },
      { id: "sf2", date: "12 de Novembro de 2023", type: "Sessão Online", notes: "Exploração de sentimentos e técnicas de autocuidado.", status: "Agendada", },
    ],
  },
];