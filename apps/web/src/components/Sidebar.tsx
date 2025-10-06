// src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css';
// Importação dos ícones que vamos usar
import { FiHome, FiCalendar, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname.startsWith(pathname);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="/LogoPng.png" alt="MindFlow Logo" className={styles.logo} />
      </div>
      <nav className={styles.navigation}>
        <ul>
          {/* Dashboard */}
          <li className={isActive('/dashboard') ? styles.active : ''}>
            <Link href="/dashboard" className={styles.navLink}>
              <FiHome className={styles.icon} />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* Agenda */}
          <li className={isActive('/agenda') ? styles.active : ''}>
            <Link href="/agenda" className={styles.navLink}>
              <FiCalendar className={styles.icon} />
              <span>Agenda</span>
            </Link>
          </li>
          {/* Pacientes */}
          <li className={isActive('/pacientes') ? styles.active : ''}>
            <Link href="/pacientes" className={styles.navLink}>
              <FiUsers className={styles.icon} />
              <span>Pacientes</span>
            </Link>
          </li>
          {/* Relatórios */}
          <li className={isActive('/relatorios') ? styles.active : ''}>
            <Link href="/relatorios" className={styles.navLink}>
              <FiBarChart2 className={styles.icon} />
              <span>Relatórios</span>
            </Link>
          </li>
          {/* Configurações */}
          <li className={isActive('/configuracoes') ? styles.active : ''}>
            <Link href="/configuracoes" className={styles.navLink}>
              <FiSettings className={styles.icon} />
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;