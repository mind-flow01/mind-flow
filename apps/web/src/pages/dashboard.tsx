import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />


      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div className="greeting">
            <h1>Bom dia, Dra. Marina.</h1>
            <p>Você tem 5 sessões agendadas para hoje.</p>
          </div>
          <button className={styles.btnPrimary}>+ Agendar Sessão</button>
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
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}