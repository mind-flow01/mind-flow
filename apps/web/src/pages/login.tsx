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
                src="/logo_escrito.png" 
                alt="Mindflow Logo" 
                width={150} 
                height={50} 
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
              
              <div className={styles.divider}>OU CONTINUE COM</div>

              <button type="button" className={styles.googleButton}>
                 <svg className={styles.googleIcon} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.251 46 30.561 46 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;