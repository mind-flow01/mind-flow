import { useState, useEffect } from 'react'; 
import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';

interface Paciente {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const [pacientesRecentes, setPacientesRecentes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        const token = localStorage.getItem('seu-token-jwt');
        if (!token) {
          throw new Error('Usuário não autenticado');
        }

        const response = await fetch('http://localhost:3001/users/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar pacientes');
        }

        const todosPacientes = await response.json();
        
        setPacientesRecentes(todosPacientes.slice(0, 3));

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPacientes();
  }, []); 


  const renderPacientesCard = () => {
    if (isLoading) {
      return <p>Carregando...</p>;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (pacientesRecentes.length === 0) {
      return <p>Nenhum paciente encontrado.</p>;
    }

    return (
      <ul className={styles.recentList}>
        {pacientesRecentes.map(paciente => (
          <li key={paciente.id}>
            <span>{paciente.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div className="greeting">
            <h1>Bom dia, Dra. Marina.</h1>

            <p>Você tem 5 sessões agendadas para hoje.</p>
          </div>
        </header>

        <div className={styles.contentBody}>
          <section className={styles.agendaCard}>
            <h2>Sua Agenda do Dia</h2>
          </section>

          <div className={styles.sideCards}>
            <section className={styles.infoCard}>
              <h3>Ações Pendentes</h3>
            </section>

            <section className={styles.infoCard}>
              <h3>Pacientes Recentes</h3>
              {renderPacientesCard()}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}