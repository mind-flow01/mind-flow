import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/cadastro.module.css';

const Cadastro: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mindflow - Novo Paciente</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.rightPanel}>
          <div className={styles.formWrapper}>
            <div className={styles.header}>

              <h3>Novo Paciente</h3>
              <p>Preencha as informações abaixo para cadastrar</p>
            </div>

            <form className={styles.formGrid}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="nome">Nome completo</label>
                  <input id="nome" type="text" placeholder="Digite o nome" className={styles.inputField} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="dataNascimento">Data de nascimento</label>
                  <input id="dataNascimento" type="date" className={styles.inputField} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="exemplo@email.com" className={styles.inputField} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="idade">Idade</label>
                  <input id="idade" type="number" placeholder="Digite a idade" className={styles.inputField} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="telefone">Telefone</label>
                  <input id="telefone" type="tel" placeholder="(00) 00000-0000" className={styles.inputField} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="foto">Foto</label>
                  <input id="foto" type="file" accept="image/*" className={styles.inputFieldFile} />
                </div>
              </div>

              <div className={styles.inputGroupFull}>
                <label htmlFor="endereco">Endereço</label>
                <input id="endereco" type="text" placeholder="Rua, número, bairro, cidade" className={styles.inputField} />
              </div>

              <button type="submit" className={styles.submitButton}>
                Cadastrar Paciente
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
