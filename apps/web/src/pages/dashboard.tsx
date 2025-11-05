import { useState, useEffect } from 'react'; // <-- 1. Importar hooks
import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';

interface Paciente {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  // --- 2. Criar os estados ---
  const [pacientesRecentes, setPacientesRecentes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 3. Hook para buscar os dados ---
  useEffect(() => {
    async function fetchPacientes() {
      try {
        const token = localStorage.getItem('seu-token-jwt'); // <-- Use a sua chave de token
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
        
        // 4. Pegar apenas os 3 primeiros para o dashboard
        setPacientesRecentes(todosPacientes.slice(0, 3));

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPacientes();
  }, []); // [] = Roda apenas uma vez


  // --- 5. Função para renderizar o conteúdo do card ---
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

    // Mapeia os pacientes para uma lista simples
    return (
      <ul className={styles.recentList}>
        {pacientesRecentes.map(paciente => (
          <li key={paciente.id}>
            {/* Você pode adicionar uma foto aqui se quiser */}
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
            {/* Você pode popular este "5" da mesma forma, 
              criando outro estado e fazendo outro fetch 
              para a sua rota de agenda.
            */}
            <p>Você tem 5 sessões agendadas para hoje.</p>
          </div>
        </header>

        <div className={styles.contentBody}>
          <section className={styles.agendaCard}>
            <h2>Sua Agenda do Dia</h2>
            {/* Conteúdo da Agenda aqui */}
          </section>

          <div className={styles.sideCards}>
            <section className={styles.infoCard}>
              <h3>Ações Pendentes</h3>
              {/* Conteúdo das Ações aqui */}
            </section>

            <section className={styles.infoCard}>
              <h3>Pacientes Recentes</h3>
              {/* --- 6. Chamar a função de renderização --- */}
              {renderPacientesCard()}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}