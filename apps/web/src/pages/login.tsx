// src/pages/login.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Login.module.css'; 

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mindflow - Entrar</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.overlay}></div> 
          <div className={styles.leftPanelContent}> 
            
            <h2 className={styles.brandSubtitle}>
              Plataforma completa para gestão de consultório psicológico
            </h2>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className={styles.rightPanel}>
          <div className={styles.formWrapper}>
            <div className={styles.brandContainer}>
              <Image 
                src="/logoPng.png" 
                alt="Mindflow Logo" 
                width={120} 
                height={120} 
                className={styles.logo} 
              />

            </div>
            <h3>Bem-vindo de volta</h3>
            <p>Entre com suas credenciais para acessar</p>

            <form>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className={styles.inputField}
                />
              </div>

              <div className={styles.optionsRow}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Lembrar-se de mim</span>
                </label>
                <a href="#" className={styles.forgotPasswordLink}>
                  Esqueci minha senha
                </a>
              </div>

              <button type="submit" className={styles.submitButton}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;