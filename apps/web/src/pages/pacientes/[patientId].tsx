import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Componentes (assumindo que estão na pasta components)
import Header from '@/components/Header';
import SessionCard from '@/components/SessionCard';
import Layout from '@/components/Layout'; // Importe seu Layout se estiver usando um

// Estilos
import styles from '@/styles/PacienteDetalhes.module.css'; // Supondo que você criou este CSS module

// Dados e Tipos
import { mockPatientsDetails } from '@/lib/mockData';
// É uma boa prática exportar os tipos do seu arquivo de dados para reutilizá-los
import type { PatientDetail as Patient, PatientSession } from '@/lib/mockData';

const PatientDetailsPage: React.FC = () => {
  const router = useRouter();
  // O nome do parâmetro 'patientId' vem do nome do arquivo: [patientId].tsx
  const { patientId } = router.query;
  const [activeTab, setActiveTab] = useState('HistoricoDeSessoes');

  // --- LÓGICA DE CARREGAMENTO E BUSCA DE DADOS ---

  // 1. Enquanto o Next.js não popula o router.query, exibimos um estado de carregamento.
  // Isso resolve o problema de "paciente não encontrado" no carregamento inicial.
  if (!router.isReady) {
    return (
      <Layout>
        <div className={styles.centeredMessage}>Carregando paciente...</div>
      </Layout>
    );
  }

  // 2. Com o patientId disponível, buscamos o paciente no nosso array de dados.
  const patient = mockPatientsDetails.find(p => p.id === patientId);

  // 3. Se, mesmo após o carregamento, o paciente não for encontrado, exibimos a mensagem de erro.
  if (!patient) {
    return (
      <Layout>
        <div className={styles.centeredMessage}>
          Paciente não encontrado. Verifique se o ID na URL está correto.
        </div>
      </Layout>
    );
  }

  // --- FUNÇÕES DE NAVEGAÇÃO E AÇÕES ---

  // Função que navega para a página de prontuário da sessão específica
  const handleViewProntuario = (sessionId: string) => {
    if (patientId) {
      router.push(`/pacientes/${patientId}/sessoes/${sessionId}`);
    }
  };

  return (
      <div className={styles.patientDetailsPage}>
        <Header title="Detalhes do Paciente" />

        {/* SUMÁRIO DO PACIENTE */}
        <div className={styles.patientSummary}>
          <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
          <div className={styles.patientInfo}>
            <h2 className={styles.patientName}>{patient.name}</h2>
            <p className={styles.lastSession}>Última sessão: {patient.lastSession}</p>
          </div>
          <div className={styles.summaryActions}>
            <button className={styles.scheduleButton}>+ Agendar Nova Sessão</button>
            <button className={styles.editButton}>Editar Dados</button>
          </div>
        </div>

        {/* ABAS DE NAVEGAÇÃO */}
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
          {/* Outras abas podem ser adicionadas aqui */}
        </nav>

        {/* CONTEÚDO DAS ABAS */}
        <div className={styles.tabContent}>
          {activeTab === 'HistoricoDeSessoes' && (
            <div className={styles.sessionHistory}>
              {patient.sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  date={session.date}
                  type={session.type}
                  // O campo 'notes' agora é um objeto. Mostramos um resumo do campo 'subjective'.
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