// src/pages/pacientes/[patientId]/sessoes/live.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/SessaoAtiva.module.css';
// Ícones usados
import { FiPlayCircle, FiPauseCircle, FiCheckSquare, FiMic, FiChevronsLeft, FiSquare } from 'react-icons/fi';
import { mockPatientsDetails } from '@/lib/mockData';

// Define os possíveis estados da sessão
type SessionState = 'INACTIVE' | 'ACTIVE' | 'PAUSED' | 'REVIEW';

/**
 * Pequena declaração para evitar erros do TS sobre propriedades não padrão do window
 */
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const LiveSessionPage: React.FC = () => {
  const router = useRouter();
  const { patientId } = router.query;

  const [sessionState, setSessionState] = useState<SessionState>('INACTIVE');
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);
  const [notes, setNotes] = useState('');

  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // REMOVIDOS OS ESTADOS DE IA
  
  const recognitionRef = useRef<any>(null);

  // Controla o cronômetro
  useEffect(() => {
    let interval: number | null = null;
    // O cronômetro roda APENAS no estado ACTIVE
    if (sessionState === 'ACTIVE') {
      interval = window.setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    }
    return () => {
      if (interval !== null) {
        window.clearInterval(interval);
      }
    };
  }, [sessionState]);

  // Função para garantir que a gravação pare e o texto seja mesclado
  const stopAndMergeRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      // Mescla o texto parcial ao final
      setFinalTranscript((prev) => (prev + ' ' + interimTranscript).trim());
      setInterimTranscript('');
    }
  };

  // Funções de controle da sessão
  const handleStartSession = () => setSessionState('ACTIVE');
  
  const handlePauseSession = () => {
    stopAndMergeRecording();
    setSessionState('PAUSED');
  };
  
  const handleResumeSession = () => setSessionState('ACTIVE');
  
  const handleGoToReview = () => {
    stopAndMergeRecording(); 
    // REMOVIDA A CHAMADA DA IA AQUI
    setSessionState('REVIEW');
  };

  const handleToggleRecording = () => {
    if (sessionState !== 'ACTIVE') return;

    if (!consentGiven) {
      alert('É necessário marcar o consentimento do paciente para iniciar a gravação.');
      return;
    }

    // Lógica de iniciar e parar gravação
    if (!isRecording) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Reconhecimento de voz não é suportado neste navegador (use Chrome/Edge).');
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const chunk = (result[0] && result[0].transcript) ? result[0].transcript : '';
          if (result.isFinal) {
            finalText += chunk.trim() + ' ';
          } else {
            interim += chunk;
          }
        }

        if (finalText) {
          setFinalTranscript((prev) => (prev + ' ' + finalText).trim());
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
      };

      recognition.onend = () => {
        // Se a gravação parou sem ser pelo botão (ex: timeout), marcamos isRecording false.
        setIsRecording(false);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      return;
    }

    // Parar
    stopAndMergeRecording();
  };

  // Funções de finalização
  const handleFinalizeAndSave = () => {
    // Garante que o profissional adicionou notas
    if (notes.trim().length === 0) {
        alert('Por favor, adicione suas anotações ou avaliação final antes de salvar.');
        return;
    }

    const payload = {
      patientId,
      notes,
      transcript: finalTranscript,
      durationSeconds: timeElapsed,
      date: new Date().toISOString(),
    };
    console.log('Enviando payload (final):', payload);

    alert('Sessão finalizada e dados salvos com sucesso!');
    router.push(`/pacientes/${patientId}`);
  };


  const patient = mockPatientsDetails.find((p) => p.id === patientId);
  if (!router.isReady || !patient) {
    return <div className={styles.centeredMessage}>Carregando informações da sessão...</div>;
  }

  // Variáveis para controlar desabilitação e conteúdo
  const isSessionActive = sessionState === 'ACTIVE';
  // Permite edição em ACTIVE, PAUSED e REVIEW
  const isNotesAndTranscriptEditable = sessionState !== 'INACTIVE'; 
  const displayableTranscript = (finalTranscript + ' ' + (isRecording ? interimTranscript : '')).trim();

  // Define o status de exibição
  const statusDisplay = {
      'INACTIVE': 'Pronta para Iniciar',
      'ACTIVE': 'Em Andamento',
      'PAUSED': 'Pausada (Retomar/Revisar)',
      'REVIEW': 'Revisão Final'
  }[sessionState];

  return (
    <>
      <Head>
        <title>Sessão Ativa - {patient.name}</title>
      </Head>
      <div className={styles.sessionPage}>
        <aside className={styles.sidebar}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FiChevronsLeft /> Voltar
          </button>
          <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
          <h2>{patient.name}</h2>
          <div className={styles.sessionInfo}>
            <p><strong>Data da Sessão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            <p>
                <strong>Duração:</strong> 
                <span className={sessionState === 'ACTIVE' ? styles.activeDuration : ''}>
                    {formatTime(timeElapsed)}
                </span>
            </p>
            <p><strong>Status:</strong> <span className={styles.statusText}>{statusDisplay}</span></p>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={`${styles.controlsBar} ${isSessionActive ? styles.active : ''}`}>
            {/* O Timer fica sempre visível */}
            <div className={styles.timerDisplay}>{formatTime(timeElapsed)}</div>

            {/* Controles de Gravação e Consentimento - Apenas no estado ACTIVE */}
            {sessionState === 'ACTIVE' && (
              <div className={styles.recordingControls}>
                <div className={styles.consent}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    disabled={isRecording} // Não permite desmarcar se estiver gravando
                  />
                  <label htmlFor="consent">Gravação consentida</label>
                </div>

                <button
                  onClick={handleToggleRecording}
                  disabled={!consentGiven}
                  className={`${styles.recordButton} ${isRecording ? styles.recordingActive : ''}`}
                >
                  <FiMic /> {isRecording ? 'Parar Gravação' : 'Gravar Áudio'}
                </button>
              </div>
            )}

            {/* Botões de Ação da Sessão (Lógica de estados) */}
            <div className={styles.actionButtons}>
              {/* ESTADO INACTIVE */}
              {sessionState === 'INACTIVE' && (
                <button onClick={handleStartSession} className={styles.sessionButtonStart}>
                  <FiPlayCircle /> Iniciar Sessão
                </button>
              )}

              {/* ESTADO ACTIVE */}
              {sessionState === 'ACTIVE' && (
                <>
                  <button onClick={handlePauseSession} className={styles.sessionButtonPause}>
                    <FiPauseCircle /> Pausar
                  </button>
                  <button onClick={handleGoToReview} className={styles.sessionButtonEnd}>
                    <FiSquare /> Encerrar e Revisar
                  </button>
                </>
              )}

              {/* ESTADO PAUSED */}
              {sessionState === 'PAUSED' && (
                <>
                  <button onClick={handleResumeSession} className={styles.sessionButtonStart}>
                    <FiPlayCircle /> Retomar
                  </button>
                  <button onClick={handleGoToReview} className={styles.sessionButtonFinalize}>
                    <FiCheckSquare /> Ir para Revisão
                  </button>
                </>
              )}

              {/* ESTADO REVIEW */}
              {sessionState === 'REVIEW' && (
                <button 
                    onClick={handleFinalizeAndSave} 
                    className={styles.sessionButtonFinalize}
                    disabled={notes.trim().length === 0} // Desabilita se as anotações estiverem vazias
                >
                  <FiCheckSquare /> Finalizar e Salvar
                </button>
              )}
            </div>
          </div>
          
          {/* Área de Anotações (Ganha o espaço extra que o painel de IA usava) */}
          <div className={styles.notesArea}>
            <textarea
              placeholder="Digite suas anotações e avaliação clínica aqui..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!isNotesAndTranscriptEditable}
            />
          </div>

          {/* CAIXA DA TRANSCRIÇÃO (Ocupa a parte inferior) */}
          <div className={styles.transcriptionBox}>
            <h3>{isRecording ? 'Transcrição em tempo real:' : 'Transcrição Completa (Editável):'}</h3>
            <textarea
              className={styles.transcriptionEditable}
              value={displayableTranscript}
              onChange={(e) => setFinalTranscript(e.target.value)}
              disabled={!isNotesAndTranscriptEditable}
            />
          </div>
          
        </main>
      </div>
    </>
  );
};

export default LiveSessionPage;