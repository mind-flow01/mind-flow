// src/pages/dashboard.tsx

// 1. Importe o seu arquivo de CSS Modules
import styles from '../styles/Dashboard.module.css';

export default function DashboardPage() {
  // 2. Aplique as classes usando a sintaxe "styles.nomeDaClasse"
  return (
    <div className={styles.dashboardContainer}>
      {/* Coluna da Esquerda: Barra de Navegação Lateral */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span>MindFlow</span>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            <li className={styles.active}>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li><a href="/agenda">Agenda</a></li>
            <li><a href="/pacientes">Pacientes</a></li>
            <li><a href="/relatorios">Relatórios</a></li>
            <li><a href="/configuracoes">Configurações</a></li>
          </ul>
        </nav>
      </aside>

      {/* Coluna da Direita: Conteúdo Principal */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div className="greeting">
            <h1>Bom dia, Dra. Marina.</h1>
            <p>Você tem 5 sessões agendadas para hoje.</p>
          </div>
          {/* Adicionei uma classe de exemplo para o botão */}
          <button className="btn-primary">+ Agendar Sessão</button>
        </header>

        <div className={styles.contentBody}>
          <section className={styles.agendaCard}>
            <h2>Sua Agenda do Dia</h2>
            {/* O conteúdo da agenda viria aqui */}
          </section>

          <div className={styles.sideCards}>
            <section className={styles.infoCard}>
              <h3>Ações Pendentes</h3>
              {/* O conteúdo das ações viria aqui */}
            </section>

            <section className={styles.infoCard}>
              <h3>Pacientes Recentes</h3>
              {/* O conteúdo dos pacientes viria aqui */}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}