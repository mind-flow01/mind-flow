// src/pages/pacientes/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from '../../styles/ListaPacientes.module.css';
import { mockPatientsList } from '../../lib/mockData';
import { FiPlus } from 'react-icons/fi';
import { NextPageWithAuth } from '@/types/page-auth';


const PatientsListPage: NextPageWithAuth = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatientsList.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Este é o contêiner principal da página (Borda Azul)
    <div className={styles.patientsListPage}>
      <Header title="Meus Pacientes" />

      <div className={styles.actionsContainer}>
        <input
          type="text"
          placeholder="Pesquisar pacientes..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/pacientes/novo" className={styles.newPatientButton}>
          <FiPlus className={styles.buttonIcon} />
          <span>Adicionar Novo Paciente</span>
        </Link>
      </div>

      {/*
        ESTRUTURA CORRETA:
        O .patientList (que deveria ter a borda verde) é um filho DIRETO do .patientsListPage.
        NÃO deve haver um <div> extra envolvendo este .patientList.
      */}
      <div className={styles.patientList}>
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <Link key={patient.id} href={`/pacientes/${patient.id}`} className={styles.patientCard}>
              <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
              <div className={styles.patientInfo}>
                <h3 className={styles.patientName}>{patient.name}</h3>
                <p className={styles.lastSession}>Última sessão: {patient.lastSession}</p>
              </div>
              <span className={styles.arrowIcon}>→</span>
            </Link>
          ))
        ) : (
          <p className={styles.noResults}>Nenhum paciente encontrado com "<strong>{searchTerm}</strong>".</p>
        )}
      </div>
    </div>
  );
};

PatientsListPage.auth = {
  isProtected: true,
};

export default PatientsListPage;