import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(''); 

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      const callbackUrl = router.query.callbackUrl;
      const destination = typeof callbackUrl === 'string' && callbackUrl ? callbackUrl : '/dashboard';

      router.push(destination);

    } else {
      setError('Email ou senha inválidos. Tente novamente.');
      console.error(result?.error);
    }
  };

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

            <form onSubmit={handleSubmit}>
              {error && <p className={styles.errorMessage}>{error}</p>}
              
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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