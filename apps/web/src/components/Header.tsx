// src/components/Header.tsx
import styles from '../styles/Header.module.css'; // Crie este arquivo de estilo

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;