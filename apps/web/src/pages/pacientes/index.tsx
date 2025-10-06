
// src/pages/pacientes/index.tsx
import React, { useState } from 'react'; // Importar useState
import Link from 'next/link';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import styles from '../../styles/ListaPacientes.module.css';

// Interface para tipagem dos dados do paciente (simplificada para a lista)
interface PatientListItem {
  id: string;
  name: string;
  avatar: string;
  lastSession: string;
}

const mockPatients: PatientListItem[] = [
  { id: 'abel-ferreira', name: 'Abel Ferreira', avatar: '/abel.jpg', lastSession: '27/11/2021' },
  { id: 'joao-souza', name: 'João Souza', avatar: '/patient_male_avatar.jpg', lastSession: '01/11/2023' },
  { id: 'maria-oliveira', name: 'Maria Oliveira', avatar: '/patient_female_avatar.jpg', lastSession: '15/09/2023' },
  { id: 'carlos-pereira', name: 'Carlos Pereira', avatar: '/patient_male_avatar.jpg', lastSession: '10/10/2023' },
  { id: 'sofia-fernandes', name: 'Sofia Fernandes', avatar: '/patient_female_avatar.jpg', lastSession: '05/11/2023' },
];

const PatientsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

  // Lógica para filtrar os pacientes com base no termo de pesquisa
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.patientsListPage}>
        <Header title="Meus Pacientes" />

        <div className={styles.actionsContainer}>
          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Pesquisar pacientes..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botão de Adicionar Novo Paciente */}
          <Link href="/pacientes/novo" className={styles.newPatientButton}>
            + Adicionar Novo Paciente
          </Link>
        </div>

        <div className={styles.patientList}>
          {filteredPatients.map(patient => ( // Renderiza os pacientes filtrados
            <Link key={patient.id} href={`/pacientes/${patient.id}`} className={styles.patientCard}>
              <img src={patient.avatar} alt={patient.name} className={styles.patientAvatar} />
              <div className={styles.patientInfo}>
                <h3 className={styles.patientName}>{patient.name}</h3>
                <p className={styles.lastSession}>Última sessão: {patient.lastSession}</p>
              </div>
              <span className={styles.arrowIcon}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PatientsListPage;