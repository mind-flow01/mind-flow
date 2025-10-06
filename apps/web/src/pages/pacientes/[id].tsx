// src/pages/pacientes/[id].tsx
import React from 'react'; // React importado para JSX e hooks (useState)
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import SessionCard from '../../components/SessionCard';
import styles from '../../styles/PacienteDetalhes.module.css';

// Interface para tipagem do paciente
interface Patient {
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

const PatientDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // --- MOCK DATA ---
  // Na vida real, você faria uma chamada API aqui para buscar os detalhes do paciente
  const mockPatient: Patient = {
    id: id as string,
    name: "Abel Ferreira",
    avatar: "/abel.jpg", // Certifique-se de ter essa imagem em public/
    lastSession: "27/11/2021",
    personalInfo: {
      email: "abel.ferreira@email.com",
      phone: "(11) 98765-4321",
      birthDate: "15/05/1990",
      address: "Rua Palestra Italia, 1914 - São Paulo/SP",
    },
    sessions: [
      {
        id: "s1",
        date: "25 de Outubro de 2023",
        type: "Sessão Terapia Cognitivo-Comportamental",
        notes: "Foco no manejo de ansiedade e técnicas. Paciente relatou melhora na qualidade de sono. ",
        status: "Concluída",
      },
      {
        id: "s2",
        date: "18 de Outubro de 2023",
        type: "Sessão Terapia Online",
        notes: "Discussão sobre metas e progressos da semana. Utilização de exercícios de relaxamento.",
        status: "Online",
      },
      {
        id: "s3",
        date: "11 de Outubro de 2023",
        type: "Sessão Terapia Cognitivo-Comportamental",
        notes: "Avaliação inicial e definição de plano de tratamento.",
        status: "Concluída",
      },
      {
        id: "s4",
        date: "04 de Novembro de 2023",
        type: "Sessão Terapia",
        notes: "Sessão agendada para acompanhamento.",
        status: "Agendada",
      },
    ],
  };
  // --- FIM MOCK DATA ---

  if (!mockPatient) {
    return <Layout><p>Carregando paciente...</p></Layout>; // Ou uma tela de 404
  }

  const handleViewProntuario = (sessionId: string) => {
    console.log(`Ver prontuário da sessão: ${sessionId}`);
    // Implementar navegação para a tela de prontuário específica
    // router.push(`/prontuario/${sessionId}`);
  };

  const handleAddNotes = (sessionId: string) => {
    console.log(`Adicionar notas à sessão: ${sessionId}`);
    // Implementar navegação para a tela de adicionar notas
    // router.push(`/sessao/${sessionId}/notas`);
  };

  const [activeTab, setActiveTab] = React.useState('HistoricoDeSessoes'); // Estado para gerenciar abas

  return (

      <div className={styles.patientDetailsPage}>
        <Header title="Detalhes do Paciente" />

        <div className={styles.patientSummary}>
          <img src={mockPatient.avatar} alt={mockPatient.name} className={styles.patientAvatar} />
          <div className={styles.patientInfo}>
            <h2 className={styles.patientName}>{mockPatient.name}</h2>
            <p className={styles.lastSession}>Última sessão: {mockPatient.lastSession}</p>
          </div>
          <div className={styles.summaryActions}>
            <button className={styles.scheduleButton}>+ Agendar Nova Sessão</button>
            <button className={styles.editButton}>Editar Dados</button>
          </div>
        </div>

        <nav className={styles.tabs}>
          <button
            className={`${styles.tabItem} ${activeTab === 'HistoricoDeSessoes' ? styles.active : ''}`}
            onClick={() => setActiveTab('HistoricoDeSessoes')}
          >
            Histórico de Sessões
          </button>
          <button
            className={`${styles.tabItem} ${activeTab === 'InformacoesPessoais' ? styles.active : ''}`}
            onClick={() => setActiveTab('InformacoesPessoais')}
          >
            Informações Pessoais
          </button>
          <button
            className={`${styles.tabItem} ${activeTab === 'Anexos' ? styles.active : ''}`}
            onClick={() => setActiveTab('Anexos')}
          >
            Anexos
          </button>
          <button
            className={`${styles.tabItem} ${activeTab === 'Pagamentos' ? styles.active : ''}`}
            onClick={() => setActiveTab('Pagamentos')}
          >
            Pagamentos
          </button>
        </nav>

        <div className={styles.tabContent}>
          {activeTab === 'HistoricoDeSessoes' && (
            <div className={styles.sessionHistory}>
              {mockPatient.sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  date={session.date}
                  type={session.type}
                  notes={session.notes}
                  status={session.status}
                  onViewProntuario={() => handleViewProntuario(session.id)}
                  onAddNotes={session.status === 'Agendada' ? () => handleAddNotes(session.id) : undefined}
                />
              ))}
            </div>
          )}

          {activeTab === 'InformacoesPessoais' && (
            <div className={styles.personalInfoSection}>
              <h3>Dados Pessoais</h3>
              <p><strong>Email:</strong> {mockPatient.personalInfo.email}</p>
              <p><strong>Telefone:</strong> {mockPatient.personalInfo.phone}</p>
              <p><strong>Data de Nascimento:</strong> {mockPatient.personalInfo.birthDate}</p>
              <p><strong>Endereço:</strong> {mockPatient.personalInfo.address}</p>
            </div>
          )}

          {activeTab === 'Anexos' && (
            <div className={styles.attachmentsSection}>
              <h3>Documentos Anexados</h3>
              <p>Nenhum anexo encontrado.</p>
            </div>
          )}

          {activeTab === 'Pagamentos' && (
            <div className={styles.paymentsSection}>
              <h3>Histórico de Pagamentos</h3>
              <p>Nenhum registro de pagamento.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default PatientDetailsPage;