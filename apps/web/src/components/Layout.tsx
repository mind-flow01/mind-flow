// src/components/Layout.tsx

import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/*
        CORRETO: A sidebar fica aqui, ao lado do <main>.
        Ela é renderizada apenas UMA VEZ.
      */}
      <Sidebar />

      <main className={styles.content}>
        {/*
          A área de <main> deve conter APENAS o conteúdo da página,
          que é passado através da prop {children}.
          NÃO deve haver outra tag <Sidebar /> aqui dentro.
        */}
        {children}
      </main>
    </div>
  );
};

export default Layout;