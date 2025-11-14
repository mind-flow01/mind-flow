// src/components/CreatePatientForm.tsx
import React, { useState } from 'react';
import styles from '../styles/CreatePatientForm.module.css';

const CreatePatientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para a API
    console.log('Dados do novo paciente:', { name, email, phone, cpf, gender });
    
    // Simula o sucesso e limpa o formulário
    alert('Paciente cadastrado com sucesso!');
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
    setGender('');
  };

  return (
    // Usamos o 'card' como o container branco do seu design
    <div className={styles.formCard}>
      <h2>Novo Paciente</h2>
      <p className={styles.subtitle}>Preencha as informações abaixo para cadastrar</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome completo</label>
          <input
            id="name"
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gênero</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>Selecione...</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
              <option value="nao-informar">Prefiro não informar</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Cadastrar Paciente
        </button>
      </form>
    </div>
  );
};

export default CreatePatientForm;