import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/cadastro.module.css';
import api from '@/hooks/api';

const CadastroPsicologo: NextPage = () => {
  const router = useRouter();

  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [crp, setCrp] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envia os dados para a API
      await api.post('/users/psicologo', {
        name,
        email,
        password,
        crp,
      });

      // Redireciona após sucesso
      router.push('/login');
    } catch (error: any) {
      console.error('Erro ao cadastrar psicólogo:', error);
      alert(error.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mindflow - Cadastro Psicólogo</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.rightPanel}>
          <div className={styles.formWrapper}>
            <div className={styles.header}>
              <h3>Criar conta</h3>
              <p>Crie sua conta profissional para começar</p>
            </div>

            <form className={styles.formGrid} onSubmit={handleSubmit}>
              <div className={styles.inputGroupFull}>
                <label htmlFor="name" className={styles.formLabel}>
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className={styles.inputField}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    className={styles.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="crp" className={styles.formLabel}>
                    CRP
                  </label>
                  <input
                    id="crp"
                    type="text"
                    placeholder="Digite seu CRP (ex: 06/12345)"
                    className={styles.inputField}
                    value={crp}
                    onChange={(e) => setCrp(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CadastroPsicologo;
