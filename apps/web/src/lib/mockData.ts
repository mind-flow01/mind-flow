// src/lib/mockData.ts

// --- Interfaces ---
export interface PatientListItem {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
}

// Interface para as notas estruturadas
export interface SoapNotes {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface PatientSession {
  id: string;
  date: string;
  type: string;
  status: 'Concluída' | 'Confirmada' | 'Agendada' | 'Online';
  notes: SoapNotes; // Campo de notas atualizado para a nova estrutura
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
  sessions: PatientSession[];
}

// --- Dados Mockados ---
export const mockPatientsList: PatientListItem[] = [
  { id: 'ana-silva', name: 'Ana Silva', avatar: '/ana_silva_avatar.jpg', lastSession: '25/10/2023' },
  { id: 'abel-ferreira', name: 'Abel Ferreira', avatar: '/abel.jpg', lastSession: '27/11/2021' },
  { id: 'joao-souza', name: 'João Souza', avatar: '/patient_male_avatar.jpg', lastSession: '01/11/2023' },
  { id: 'maria-oliveira', name: 'Maria Oliveira', avatar: '/patient_female_avatar.jpg', lastSession: '15/09/2023' },
  { id: 'carlos-pereira', name: 'Carlos Pereira', avatar: '/patient_male_avatar.jpg', lastSession: '10/10/2023' },
  { id: 'sofia-fernandes', name: 'Sofia Fernandes', avatar: '/patient_female_avatar.jpg', lastSession: '05/11/2023' },
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
      { 
        id: "s1", date: "25 de Outubro de 2023", type: "Terapia Cognitivo-Comportamental", status: "Concluída",
        notes: {
          subjective: 'Paciente relata melhora significativa na qualidade do sono, conseguindo dormir "noites inteiras" em 4 dos últimos 7 dias. Atribui a melhora aos exercícios de relaxamento. "Ainda sinto o peito apertado antes de reuniões importantes, mas parece que consigo controlar melhor agora", relatou.',
          objective: 'Paciente apresentou-se calma, discurso fluente e coerente. Afeto congruente com o humor relatado. Manteve bom contato visual e participou ativamente da sessão. Demonstra ter compreendido e praticado as técnicas de relaxamento.',
          assessment: 'Evolução positiva no manejo de sintomas ansiosos, especialmente os relacionados ao sono. A ansiedade antecipatória em situações sociais (reuniões) ainda é um ponto focal. Boa adesão ao plano terapêutico e prognóstico favorável.',
          plan: '1. Manter a prática dos exercícios de relaxamento diariamente. 2. Introduzir técnicas de reestruturação cognitiva para os pensamentos automáticos negativos antes de eventos estressores. 3. Propor "role playing" de situações de reunião na próxima sessão para treinar habilidades sociais.'
        }
      },
      { 
        id: "s2", date: "18 de Outubro de 2023", type: "Sessão Terapia Online", status: "Online",
        notes: {
          subjective: 'Paciente relata ter tido uma semana "razoável". Discute progresso em relação às metas estabelecidas, mas menciona dificuldade em manter a consistência dos exercícios de relaxamento. "A semana foi corrida, acabei esquecendo alguns dias".',
          objective: 'Durante a sessão online, paciente manteve a câmera ligada e mostrou-se engajada. Demonstrou alguma dificuldade em recordar os passos do exercício de respiração diafragmática, necessitando de reforço.',
          assessment: 'Adesão parcial às tarefas propostas. A dificuldade parece estar na incorporação das novas práticas à rotina diária. Necessário reforçar a importância da consistência e talvez ajustar a frequência das tarefas.',
          plan: '1. Revisar e praticar a técnica de respiração diafragmática durante a sessão. 2. Discutir estratégias para criar "lembretes" ou "âncoras" na rotina para a prática dos exercícios. 3. Manter as metas atuais para a próxima semana.'
        }
      },
      { 
        id: "s4", date: "04 de Novembro de 2023", type: "Sessão Terapia", status: "Agendada",
        notes: {
          subjective: 'Sessão futura agendada para acompanhamento do plano terapêutico.',
          objective: '',
          assessment: '',
          plan: 'Verificar a aplicação das técnicas de reestruturação cognitiva e discutir os resultados do "role playing" proposto.'
        }
      },
    ],
  },
  {
    id: 'abel-ferreira',
    name: "Abel Ferreira",
    avatar: "/abel.jpg",
    lastSession: "27/11/2021",
    personalInfo: {
      email: "abel.ferreira@email.com",
      phone: "(11) 97777-7777",
      birthDate: "15/12/1978",
      address: "Rua do Técnico, 7 - São Paulo/SP",
    },
    sessions: [
      { 
        id: "af1", date: "27 de Novembro de 2021", type: "Avaliação Psicológica", status: "Concluída",
        notes: {
            subjective: 'Paciente busca terapia para lidar com "pressão extrema" no trabalho. Relata dificuldade para "desligar" após o expediente, o que tem gerado irritabilidade e conflitos familiares. Queixa-se de estresse constante e sensação de estar sempre "no limite".',
            objective: 'Apresenta-se orientado, com discurso rápido e focado em temas de performance e resultados. Demonstra rigidez no pensamento e dificuldade em falar sobre emoções. Contato visual bom, mas com postura tensa.',
            assessment: 'Queixas compatíveis com quadro de estresse crônico e possível burnout em estágio inicial. Observa-se um padrão de pensamento perfeccionista e alta auto-cobrança. Paciente tem poucos recursos de relaxamento e lazer.',
            plan: '1. Iniciar psicoeducação sobre estresse e burnout. 2. Realizar levantamento de fontes de estresse e fontes de prazer/relaxamento. 3. Estabelecer contrato terapêutico e agendar sessões semanais.'
        }
      },
      { 
        id: "af2", date: "03 de Dezembro de 2021", type: "Terapia Cognitivo-Comportamental", status: "Concluída",
        notes: {
            subjective: 'Paciente relata ter refletido sobre a sessão anterior. "Percebi que não tiro férias de verdade há 3 anos". Tenta aplicar a técnica de "pausa consciente" de 5 minutos durante o dia, mas relata sentir-se culpado por "não estar produzindo".',
            objective: 'Discurso ainda acelerado, porém mais aberto a discutir as dificuldades emocionais. Consegue identificar alguns pensamentos automáticos relacionados à culpa e produtividade.',
            assessment: 'Paciente demonstra boa capacidade de insight, mas com crenças disfuncionais sobre produtividade e descanso profundamente arraigadas. A culpa é um afeto central a ser trabalhado. Boa adesão inicial.',
            plan: '1. Introduzir o modelo cognitivo (Situação -> Pensamento -> Emoção -> Comportamento). 2. Trabalhar a flexibilização cognitiva sobre as regras de autoexigência. 3. Manter a prática das "pausas conscientes", associando-as a um registro de pensamentos.'
        }
      },
    ],
  },
  // ... Dados para os outros pacientes com a mesma estrutura detalhada
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
      { 
        id: "js1", date: "01 de Novembro de 2023", type: "Terapia de Casal", status: "Concluída",
        notes: {
            subjective: 'Casal relata discussões frequentes sobre finanças e divisão de tarefas domésticas. João queixa-se de se sentir "sobrecarregado", enquanto a parceira (não presente na nota) se queixa de "falta de diálogo". Ambos expressam desejo de melhorar a relação.',
            objective: 'Observa-se um padrão de comunicação de ataque-defesa durante a sessão. Ambos interrompem um ao outro com frequência. Demonstram dificuldade em ouvir a perspectiva do outro, mas mostram-se dispostos a tentar as técnicas propostas.',
            assessment: 'Dificuldades de comunicação e negociação são os pontos centrais do conflito. Não há indicativos de problemas mais graves, mas o padrão de interação atual é disfuncional e gera desgaste.',
            plan: '1. Propor exercício de "escuta ativa" para ser praticado em casa. 2. Introduzir o conceito de "Comunicação Não-Violenta". 3. Agendar sessão individual com cada um para explorar questões pessoais que possam estar impactando a relação.'
        }
      },
      { 
        id: "js3", date: "08 de Novembro de 2023", type: "Sessão Agendada", status: "Agendada",
        notes: {
            subjective: 'Próxima sessão agendada para dar continuidade à terapia de casal.',
            objective: '',
            assessment: '',
            plan: 'Revisar a prática do exercício de escuta ativa e aprofundar a discussão sobre a divisão de responsabilidades.'
        }
      },
    ],
  },
];