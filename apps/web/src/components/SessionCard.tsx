// src/components/SessionCard.tsx
import styles from '../styles/PacienteDetalhes.module.css'; // Usa o mesmo CSS da página principal

interface SessionCardProps {
  date: string;
  type: string;
  notes: string;
  status: 'Concluída' | 'Confirmada' | 'Agendada' | 'Online';
  onViewProntuario: () => void;
  onAddNotes?: () => void; // Opcional, para sessões que ainda não têm notas
}

const SessionCard: React.FC<SessionCardProps> = ({
  date,
  type,
  notes,
  status,
  onViewProntuario,
  onAddNotes,
}) => {
  return (
    <div className={styles.sessionCard}>
      <div className={styles.sessionInfo}>
        <p className={styles.sessionDate}>{date}</p>
        <p className={styles.sessionType}>{type}</p>
        <p className={styles.sessionNotesPreview}>{notes}</p>
      </div>
      <div className={styles.sessionActions}>
        <span className={`${styles.sessionStatus} ${styles[status.toLowerCase()]}`}>
          {status}
        </span>
        {status === 'Concluída' || status === 'Online' ? (
          <button className={styles.viewProntuarioButton} onClick={onViewProntuario}>
            Ver Prontuário
          </button>
        ) : (
          onAddNotes && (
            <button className={styles.addNotesButton} onClick={onAddNotes}>
              Adicionar Notas
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SessionCard;