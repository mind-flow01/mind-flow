// src/pages/pacientes/[patientId]/sessoes/live.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/SessaoAtiva.module.css';
import { FiPlayCircle, FiSquare, FiMic, FiChevronsLeft } from 'react-icons/fi';
import { mockPatientsDetails } from '@/lib/mockData';

// Função auxiliar para formatar os segundos em HH:MM:SS
const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const LiveSessionPage: React.FC = () => {
  const router = useRouter();
  const { patientId } = router.query;
  
  // Estados para controlar a interface
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);
  const [notes, setNotes] = useState('');

  // Lógica do Cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
    }
    // Função de limpeza: para o cronômetro se a sessão for encerrada
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]); // Este efeito só roda novamente se o estado 'isActive' mudar

  // Ações do usuário
  const handleStartSession = () => setIsActive(true);

  const handleEndSession = () => {
    setIsActive(false);
    // Em um app real, aqui você faria a chamada para a API para salvar tudo
    console.log("Sessão encerrada. Duração:", formatTime(timeElapsed));
    console.log("Anotações:", notes);
    if (isRecording) {
      setIsRecording(false);
      console.log("Gravação interrompida e pronta para upload.");
      // Lógica para parar a gravação de áudio e fazer o upload do arquivo
    }
    alert("Sessão encerrada e salva com sucesso!");
    router.push(`/pacientes/${patientId}`);
  };

  const handleToggleRecording = () => {
    if (!consentGiven) {
      alert("É necessário marcar o consentimento do paciente para iniciar a gravação.");
      return;
    }
    setIsRecording(prev => !prev);
    // A lógica para INICIAR/PARAR a gravação de áudio (usando a Web Audio API) entraria aqui
  };

  // Busca os dados do paciente
  const patient = mockPatientsDetails.find(p => p.id === patientId);

  // Exibe um estado de carregamento enquanto o Next.js não tem o ID do paciente
  if (!router.isReady || !patient) {
    return <div>Carregando informações da sessão...</div>;
  }

  return (
    <>
      <Head>
        <title>Sessão Ativa - {patient.name}</title>
      </Head>
      <div className={styles.sessionPage}>
        <aside className={styles.sidebar}>
            <button onClick={() => router.back()} className={styles.backButton}><FiChevronsLeft /> Voltar</button>
            <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
            <h2>{patient.name}</h2>
            <div className={styles.sessionInfo}>
                <p><strong>Data da Sessão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Tipo:</strong> Terapia Online</p>
                <p><strong>Queixa Principal:</strong> Ansiedade social...</p> {/* Exemplo de info rápida */}
            </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.controlsBar}>
            <div className={styles.timerDisplay}>{formatTime(timeElapsed)}</div>
            
            <div className={styles.recordingControls}>
              <div className={styles.consent}>
                <input 
                  type="checkbox" 
                  id="consent" 
                  checked={consentGiven} 
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  disabled={!isActive || isRecording}
                />
                <label htmlFor="consent">Paciente consentiu com a gravação</label>
              </div>
              <button 
                onClick={handleToggleRecording} 
                disabled={!isActive || !consentGiven}
                className={`${styles.recordButton} ${isRecording ? styles.recordingActive : ''}`}
              >
                <FiMic /> {isRecording ? 'Parar Gravação' : 'Gravar Áudio'}
              </button>
            </div>
            
            {!isActive ? (
              <button onClick={handleStartSession} className={styles.sessionButtonStart}>
                <FiPlayCircle /> Iniciar Sessão
              </button>
            ) : (
              <button onClick={handleEndSession} className={styles.sessionButtonEnd}>
                <FiSquare /> Encerrar e Salvar
              </button>
            )}
          </div>

          <div className={styles.notesArea}>
            <textarea 
              placeholder="Digite suas anotações da sessão aqui..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!isActive}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default LiveSessionPage;