// src/pages/pacientes/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from '../../styles/ListaPacientes.module.css';
import { mockPatientsList } from '../../lib/mockData';
import { FiPlus } from 'react-icons/fi';
import { NextPageWithAuth } from '@/types/page-auth';

import Modal from '../../components/Modal';
import CreatePatientForm from '../../components/CreatePatientForm';

const PatientsListPage: NextPageWithAuth = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredPatients = mockPatientsList.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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

        <button
          onClick={() => setShowModal(true)}
          className={styles.newPatientButton}
        >
          <FiPlus className={styles.buttonIcon} />
          <span>Adicionar Novo Paciente</span>
        </button>
      </div>

      <div className={styles.patientList}>
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <Link
              key={patient.id}
              href={`/pacientes/${patient.id}`}
              className={styles.patientCard}
            >
              <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
              <div className={styles.patientInfo}>
                <h3 className={styles.patientName}>{patient.name}</h3>
                <p className={styles.lastSession}>Última sessão: {patient.lastSession}</p>
              </div>
              <span className={styles.arrowIcon}>→</span>
            </Link>
          ))
        ) : (
          <p className={styles.noResults}>
            Nenhum paciente encontrado com "<strong>{searchTerm}</strong>".
          </p>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreatePatientForm />
      </Modal>
    </div>
  );
};

PatientsListPage.auth = {
  isProtected: true,
};

export default PatientsListPage;
