import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiPlayCircle } from 'react-icons/fi'; // Ícone para o novo botão

// Componentes
import Header from '@/components/Header';
import SessionCard from '@/components/SessionCard';
import Layout from '@/components/Layout';

// Estilos
import styles from '@/styles/PacienteDetalhes.module.css';

// Dados e Tipos
import { mockPatientsDetails } from '@/lib/mockData';
import type { PatientDetail as Patient, PatientSession } from '@/lib/mockData';

const PatientDetailsPage: React.FC = () => {
  const router = useRouter();
  const { patientId } = router.query;
  const [activeTab, setActiveTab] = useState('HistoricoDeSessoes');

  if (!router.isReady) {
    return (
      <Layout>
        <div className={styles.centeredMessage}>Carregando paciente...</div>
      </Layout>
    );
  }

  const patient = mockPatientsDetails.find(p => p.id === patientId);

  if (!patient) {
    return (
      <Layout>
        <div className={styles.centeredMessage}>
          Paciente não encontrado. Verifique se o ID na URL está correto.
        </div>
      </Layout>
    );
  }

  const handleViewProntuario = (sessionId: string) => {
    if (patientId) {
      router.push(`/pacientes/${patientId}/sessoes/${sessionId}`);
    }
  };

  return (

      <div className={styles.patientDetailsPage}>
        <Header title="Detalhes do Paciente" />

        <div className={styles.patientSummary}>
          <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
          <div className={styles.patientInfo}>
            <h2 className={styles.patientName}>{patient.name}</h2>
            <p className={styles.lastSession}>Última sessão: {patient.lastSession}</p>
          </div>

          {/* ======================= ÁREA ALTERADA ======================= */}
          <div className={styles.summaryActions}>
            <button className={styles.editButton}>Editar Dados</button>
            <button className={styles.scheduleButton}>+ Agendar Nova Sessão</button>
            
            {/* NOVO BOTÃO "INICIAR SESSÃO" */}
            <Link href={`/pacientes/${patientId}/sessoes/live`} className={styles.startButton}>
              <FiPlayCircle />
              Iniciar Sessão
            </Link>
          </div>
          {/* ============================================================= */}

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
        </nav>

        <div className={styles.tabContent}>
          {activeTab === 'HistoricoDeSessoes' && (
            <div className={styles.sessionHistory}>
              {patient.sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  date={session.date}
                  type={session.type}
                  notes={session.notes.subjective.substring(0, 120) + '...'}
                  status={session.status}
                  onViewProntuario={() => handleViewProntuario(session.id)}
                  onAddNotes={session.status === 'Agendada' ? () => console.log('Adicionar notas para:', session.id) : undefined}
                />
              ))}
            </div>
          )}

          {activeTab === 'InformacoesPessoais' && (
            <div className={styles.personalInfoSection}>
              <h3>Dados Pessoais</h3>
              <p><strong>Email:</strong> {patient.personalInfo.email}</p>
              <p><strong>Telefone:</strong> {patient.personalInfo.phone}</p>
              <p><strong>Data de Nascimento:</strong> {patient.personalInfo.birthDate}</p>
              <p><strong>Endereço:</strong> {patient.personalInfo.address}</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default PatientDetailsPage;