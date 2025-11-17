// src/pages/pacientes/[patientId]/sessoes/live.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/SessaoAtiva.module.css';
// Ícones usados
import { 
  FiPlayCircle, 
  FiPauseCircle, 
  FiCheckSquare, 
  FiMic, 
  FiChevronsLeft, 
  FiSquare, 
  FiEdit2,
  // FiSparkles FOI REMOVIDO DAQUI
} from 'react-icons/fi'; 
import { IoSparkles } from 'react-icons/io5'; // <-- MUDANÇA AQUI: Nova importação
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
  
  // NOVOS STATES PARA A IA
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const recognitionRef = useRef<any>(null);

  // Controla o cronômetro
  useEffect(() => {
    let interval: number | null = null;
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
    setSessionState('REVIEW');
  };

  const handleToggleRecording = () => {
    if (sessionState !== 'ACTIVE') return;

    if (!consentGiven) {
      alert('É necessário marcar o consentimento do paciente para iniciar a gravação.');
      return;
    }

    // Lógica de iniciar e parar gravação (simplificada para o frontend)
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

  // NOVA FUNÇÃO PARA CHAMAR A API DA IA
  const handleGenerateSuggestion = async () => {
    if (notes.trim().length === 0 && finalTranscript.trim().length === 0) {
      alert('Por favor, tenha anotações ou uma transcrição para gerar sugestões.');
      return;
    }
    
    setIsLoadingSuggestion(true);
    setAiSuggestion(''); // Limpa sugestões antigas

    try {
      const response = await fetch('/api/generate-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: finalTranscript,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await response.json();
      
      if(data.suggestion) {
        setAiSuggestion(data.suggestion);
      } else {
        setAiSuggestion('Nenhuma sugestão retornada ou ocorreu um erro na API.');
      }

    } catch (error) {
      console.error('Erro ao buscar sugestão da IA:', error);
      alert('Ocorreu um erro ao tentar gerar a sugestão da IA.');
    } finally {
      setIsLoadingSuggestion(false);
    }
  };


  // Funções de finalização
  const handleFinalizeAndSave = () => {
    if (notes.trim().length === 0) {
        alert('Por favor, adicione suas anotações ou avaliação final antes de salvar.');
        return;
    }

    const payload = {
      patientId,
      notes,
      transcript: finalTranscript,
      aiSuggestion: aiSuggestion, // Opcional: Salvar a sugestão da IA
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
  const isSessionInactive = sessionState === 'INACTIVE';
  const isNotesAndTranscriptEditable = !isSessionInactive; 
  const displayableTranscript = (finalTranscript + ' ' + (isRecording ? interimTranscript : '')).trim();

  // Define o status de exibição
  const statusDisplay = {
      'INACTIVE': 'Pronta para Iniciar',
      'ACTIVE': 'Em Andamento',
      'PAUSED': 'Pausada (Retomar/Revisar)',
      'REVIEW': 'Revisão Final'
  }[sessionState];
  
  // Classe de controle para a barra
  const controlsBarClass = isSessionInactive ? styles.inactive : styles.active;

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
          <div className={`${styles.controlsBar} ${controlsBarClass}`}>
            
            {/* O Timer só aparece se a sessão NÃO estiver INACTIVE */}
            {!isSessionInactive && (
                <div className={styles.timerDisplay}>{formatTime(timeElapsed)}</div>
            )}

            {/* Controles de Gravação e Consentimento - Apenas no estado ACTIVE */}
            {isSessionActive && (
              <div className={styles.recordingControls}>
                <div className={styles.consent}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    disabled={isRecording}
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
              {isSessionInactive && (
                <button onClick={handleStartSession} className={styles.sessionButtonStart}>
                  <FiPlayCircle /> Iniciar Sessão
                </button>
              )}

              {/* ESTADO ACTIVE */}
              {isSessionActive && (
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
                    disabled={notes.trim().length === 0} 
                >
                  <FiCheckSquare /> Finalizar e Salvar
                </button>
              )}
            </div>
          </div>
          
          {/* Título da Área de Anotações */}
          <h3 className={styles.notesTitle}>
             <FiEdit2 style={{marginRight: '5px', verticalAlign: 'middle'}} /> Anotações Clínicas e Evolução
          </h3>

          {/* Área de Anotações */}
          <div className={styles.notesArea}>
            <textarea
              placeholder="Digite suas anotações e avaliação clínica aqui..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!isNotesAndTranscriptEditable}
            />
          </div>

          
          {/* CAIXA DA TRANSCRIÇÃO */}
          <div className={styles.transcriptionBox}>
            <h3>{isRecording ? 'Transcrição em tempo real:' : 'Transcrição Completa (Editável):'}</h3>
            <textarea
              className={styles.transcriptionEditable}
              value={displayableTranscript}
              onChange={(e) => setFinalTranscript(e.target.value)}
              disabled={!isNotesAndTranscriptEditable || isRecording} // Desabilitar edição manual enquanto grava
            />
          </div>
          
              {/* ==== BLOCO DA IA ==== */}
          <div className={styles.aiArea}>
            <button
              className={styles.aiButton}
              onClick={handleGenerateSuggestion}
              disabled={isLoadingSuggestion || !isNotesAndTranscriptEditable}
            >
              <IoSparkles /> {/* <-- MUDANÇA AQUI: Ícone trocado */}
              {isLoadingSuggestion ? 'Analisando...' : 'Gerar Sugestões com IA'}
            </button>
            <textarea
              className={styles.aiSuggestionBox}
              placeholder="As sugestões da IA aparecerão aqui..."
              value={aiSuggestion}
              readOnly
            />
          </div>
          {/* ==== FIM DO BLOCO ==== */}
          
        </main>
      </div>
    </>
  );
};

export default LiveSessionPage;