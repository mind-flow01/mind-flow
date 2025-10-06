import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mockPatientsDetails } from '@/lib/mockData';
import styles from '../../../../styles/ProntuarioSessao.module.css'; // Ajuste o caminho
import { FiEdit, FiDownload, FiCpu } from 'react-icons/fi';

const SessionRecordPage: React.FC = () => {
    const router = useRouter();
    const { patientId, sessionId } = router.query;

    // Encontra o paciente e a sessão específica
    const patient = mockPatientsDetails.find(p => p.id === patientId);
    const session = patient?.sessions.find(s => s.id === sessionId);

    if (!patient || !session) {
        return <main className={styles.mainContent}><p>Prontuário não encontrado...</p></main>;
    }

    return (
        <main className={styles.mainContent}>
            <div className={styles.breadcrumb}>
                <Link href="/pacientes">Pacientes</Link> &gt;{' '}
                <Link href={`/pacientes/${patient.id}`}>{patient.name}</Link> &gt;{' '}
                Sessão de {session.date}
            </div>

            <div className={styles.header}>
                <h1>Prontuário da Sessão</h1>
                <div className={styles.actions}>
                    <button className={styles.btnSecondary}><FiEdit /> Editar Anotação</button>
                    <button className={styles.btn}><FiDownload /> Exportar PDF</button>
                </div>
            </div>

            <div className={styles.metadataCard}>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Data da Sessão</span>
                    <span className={styles.metadataValue}>{session.date}</span>
                </div>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Tipo</span>
                    <span className={styles.metadataValue}>{session.type}</span>
                </div>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Status</span>
                    <span className={styles.metadataValue}>{session.status}</span>
                </div>
            </div>

            <div className={styles.contentLayout}>
                {/* Coluna Principal com as Anotações SOAP */}
                <div className={styles.noteColumn}>
                    <div className={styles.soapSection}>
                        <h3>Subjetivo (S)</h3>
                        <p>{session.notes.subjective}</p>
                    </div>
                    <div className={styles.soapSection}>
                        <h3>Objetivo (O)</h3>
                        <p>{session.notes.objective}</p>
                    </div>
                    <div className={styles.soapSection}>
                        <h3>Avaliação (A)</h3>
                        <p>{session.notes.assessment}</p>
                    </div>
                    <div className={styles.soapSection}>
                        <h3>Plano (P)</h3>
                        <p>{session.notes.plan}</p>
                    </div>
                </div>

                {/* Coluna Lateral com Ferramentas de IA */}
                <aside className={styles.aiPanel}>
                    <h3><FiCpu /> Análise da IA</h3>
                    {/* Aqui entrariam os componentes de insights da IA */}
                    <p>Resumo, tópicos e sentimentos da sessão gerados por IA...</p>
                </aside>
            </div>
        </main>
    );
};

export default SessionRecordPage;