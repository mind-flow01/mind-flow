// src/pages/settings.tsx

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '@/styles/Configuracoes.module.css';
import { FiSave, FiUser, FiMail, FiPhone, FiCalendar, FiLock, FiInfo, FiUpload, FiCamera, FiCheckCircle } from 'react-icons/fi';

// --- Tipos de Dados (Expandidos para ambos os perfis) ---

type UserType = 'PATIENT' | 'PSYCHOLOGIST';

interface UserData {
    id: string;
    nome: string;
    data_de_nascimento: string; 
    email: string;
    idade: number;
    telefone: string;
    foto: string; 
    endereco: string;
    login: string;
    tipo_usuario: UserType;
    senha_hash: string; 
}

interface PatientFields {
    cpf: string;
    historico: string;
    status: string;
    genero: string;
    observacoes_iniciais: string;
    psicologo_responsavel_id: string;
}

interface PsychologistFields {
    crp: string;
    bio: string;
    configuracoes_agenda: string;
}

type ProfileData = UserData & Partial<PatientFields> & Partial<PsychologistFields>;

// --- Dados Mock (Para simular os dois logins) ---

const mockPatientProfile: ProfileData = {
    id: 'user-123',
    nome: 'Ana Silva',
    data_de_nascimento: '1995-08-15',
    email: 'ana.silva@exemplo.com',
    idade: 29,
    telefone: '(11) 98765-4321',
    foto: '/default-patient.png', 
    endereco: 'Rua das Flores, 100 - São Paulo',
    login: 'ana.silva',
    tipo_usuario: 'PATIENT',
    senha_hash: 'asdf123',
    cpf: '123.456.789-00',
    historico: 'ID-HIST-001',
    status: 'Ativo',
    genero: 'Feminino',
    observacoes_iniciais: 'Ansiedade leve e histórico familiar.',
    psicologo_responsavel_id: 'psy-456',
};

const mockPsychologistProfile: ProfileData = {
    id: 'user-456',
    nome: 'Dr. João Mendes',
    data_de_nascimento: '1980-05-20',
    email: 'joao.mendes@exemplo.com',
    idade: 44,
    telefone: '(11) 91234-5678',
    foto: '/default-psychologist.png', 
    endereco: 'Av. Paulista, 2000 - São Paulo',
    login: 'dr.joao',
    tipo_usuario: 'PSYCHOLOGIST',
    senha_hash: 'qwer456',
    crp: '06/123456',
    bio: 'Especialista em Terapia Cognitivo-Comportamental (TCC) com 20 anos de experiência.',
    configuracoes_agenda: 'Seg/Qua/Sex: 9h-18h',
};

// Mapeamento para fácil acesso
const mockProfiles = {
    'user-123': mockPatientProfile,
    'user-456': mockPsychologistProfile,
};


// --- Componentes Reutilizáveis: FormField (Mantido) ---

interface FormFieldProps {
    label: string;
    name: string;
    icon: React.ElementType;
    value: string | number | undefined; // 'undefined' permitido
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    disabled?: boolean;
    isTextArea?: boolean;
    placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, icon: Icon, value, onChange, type = 'text', disabled = false, isTextArea = false, placeholder = '' }) => (
    <div className={styles.formGroup}>
        <label htmlFor={name} className={styles.label}>
            <Icon className={styles.icon} /> {label}
        </label>
        {isTextArea ? (
            <textarea
                id={name}
                name={name}
                value={value || ''} // Trata undefined
                onChange={onChange}
                disabled={disabled}
                rows={4}
                placeholder={placeholder}
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value || ''} // Trata undefined
                onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                disabled={disabled}
                placeholder={placeholder}
            />
        )}
    </div>
);


// --- Componente: Modal de Alteração de Senha (Mantido) ---

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert('A nova senha e a confirmação não coincidem.');
            return;
        }

        if (newPassword.length < 6) {
             alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        console.log('Alteração de senha enviada.');

        setIsSubmitting(false);
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
            onClose(); 
            setSuccess(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Alterar Senha de Acesso</h2>
                
                {success ? (
                    <div className={styles.successMessage}>
                        <FiCheckCircle className={styles.successIcon} />
                        <p>Sua senha foi alterada com sucesso!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <FormField 
                            label="Senha Atual" 
                            name="current_password" 
                            icon={FiLock} 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            type="password"
                        />
                        <FormField 
                            label="Nova Senha" 
                            name="new_password" 
                            icon={FiLock} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            type="password"
                        />
                        <FormField 
                            label="Confirmar Nova Senha" 
                            name="confirm_password" 
                            icon={FiLock} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            type="password"
                        />
                        <div className={styles.modalButtonContainer}>
                            <button type="submit" className={styles.saveButton} disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword}>
                                {isSubmitting ? 'Verificando...' : 'Confirmar Alteração'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

// --- Componente Principal: SettingsPage (DINÂMICO) ---

const SettingsPage: React.FC = () => {
    // VARIÁVEL DE CONTROLE: Alterne entre 'user-123' (Paciente) e 'user-456' (Psicólogo)
    const loggedInUserId = 'user-456'; 
    
    // O sistema de autenticação real forneceria este perfil
    const initialData = mockProfiles[loggedInUserId as keyof typeof mockProfiles];

    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Simulação de carregamento de dados
        setTimeout(() => {
            setProfile(initialData);
            setIsLoading(false);
        }, 500);
    }, [loggedInUserId]); // Recarrega se o ID de login mudar

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile!,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile!,
                    foto: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        setIsSaving(true);
        
        // Filtra dados internos que não devem ser salvos pelo usuário (hash, IDs de referência, etc.)
        const { senha_hash, historico, status, observacoes_iniciais, psicologo_responsavel_id, ...payloadToSave } = profile; 
        
        console.log(`Dados do ${profile.tipo_usuario} a serem salvos:`, payloadToSave);

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert('Configurações salvas com sucesso!');
        setIsSaving(false);
    };

    if (isLoading) {
        return <div className={styles.centeredMessage}>Carregando perfil...</div>;
    }

    if (!profile) {
        return <div className={styles.centeredMessage}>Erro ao carregar perfil.</div>;
    }
    
    const isPatient = profile.tipo_usuario === 'PATIENT';
    const birthDateInput = profile.data_de_nascimento.substring(0, 10);
    const pageTitle = isPatient ? 'Configurações do Paciente' : 'Configurações do Psicólogo';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div className={styles.settingsPage}>
                <header className={styles.header}>
                    <h1>{pageTitle}</h1>
                    <p>Atualize suas informações pessoais e específicas de perfil.</p>
                </header>

                <form onSubmit={handleSave} className={styles.profileForm}>
                    {/* Seção de Foto - COMUM A AMBOS */}
                    <h2 className={styles.sectionTitle}>
                        <FiCamera /> Imagem de Perfil
                    </h2>
                    <div className={styles.photoUploadContainer}>
                        <img 
                            src={profile.foto || '/default-avatar.png'} 
                            alt="Foto de Perfil" 
                            className={styles.profilePhoto} 
                        />
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handlePhotoChange} 
                            style={{ display: 'none' }} 
                            accept="image/*"
                        />
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()} 
                            className={styles.uploadButton}
                        >
                            <FiUpload /> Alterar Foto
                        </button>
                    </div>

                    {/* Informações Básicas (Usuário) - COMUM A AMBOS */}
                    <h2 className={styles.sectionTitle}>
                        <FiUser /> Dados Pessoais
                    </h2>
                    <div className={styles.grid}>
                        <FormField label="Nome Completo" name="nome" icon={FiUser} value={profile.nome} onChange={handleChange} />
                        <FormField label="E-mail" name="email" icon={FiMail} value={profile.email} onChange={handleChange} type="email" />
                        <FormField label="Telefone" name="telefone" icon={FiPhone} value={profile.telefone} onChange={handleChange} />
                        <FormField label="Data de Nascimento" name="data_de_nascimento" icon={FiCalendar} value={birthDateInput} onChange={handleChange} type="date" />
                    </div>
                    <FormField label="Endereço Completo" name="endereco" icon={FiInfo} value={profile.endereco} onChange={handleChange} />
                    
                    {/* Seção de Acesso e Senha - COMUM A AMBOS */}
                    <h2 className={styles.sectionTitle}>
                        <FiLock /> Acesso e Segurança
                    </h2>
                    <div className={styles.grid}>
                        <FormField label="Login de Acesso" name="login" icon={FiUser} value={profile.login} onChange={handleChange} disabled={true} />
                        <button type="button" className={styles.changePasswordButton} onClick={() => setIsModalOpen(true)}>
                            <FiLock /> Alterar Senha
                        </button>
                    </div>

                    {/* Campos Específicos do Perfil - DINÂMICO */}
                    <h2 className={styles.sectionTitle}>
                        <FiInfo /> {isPatient ? 'Informações de Registro (Paciente)' : 'Dados Profissionais (Psicólogo)'}
                    </h2>

                    <div className={styles.grid}>
                        {/* Lógica do Paciente */}
                        {isPatient && (
                            <>
                                <FormField label="CPF" name="cpf" icon={FiInfo} value={profile.cpf} onChange={handleChange} disabled={true} placeholder="Não editável" />
                                <FormField label="Gênero" name="genero" icon={FiInfo} value={profile.genero} onChange={handleChange} placeholder="Ex: Feminino, Masculino" />
                            </>
                        )}
                        {/* Lógica do Psicólogo */}
                        {!isPatient && (
                            <>
                                <FormField label="CRP" name="crp" icon={FiInfo} value={profile.crp} onChange={handleChange} />
                                <FormField label="Configurações de Agenda" name="configuracoes_agenda" icon={FiCalendar} value={profile.configuracoes_agenda} onChange={handleChange} placeholder="Ex: Seg/Qua/Sex: 9h-18h" />
                            </>
                        )}
                    </div>
                    
                    {/* Campos de Texto Longo (Bio/Observações) - DINÂMICO */}
                    {isPatient ? (
                        <FormField 
                            label="Observações Adicionais (Apenas leitura para o paciente)" 
                            name="observacoes_iniciais" 
                            icon={FiInfo} 
                            value={profile.observacoes_iniciais} 
                            onChange={handleChange} 
                            isTextArea={true}
                            disabled={true} // O paciente geralmente não edita essa observação inicial
                            placeholder="Informações de registro fornecidas na anamnese inicial."
                        />
                    ) : (
                        <FormField 
                            label="Biografia Profissional (Bio)" 
                            name="bio" 
                            icon={FiInfo} 
                            value={profile.bio} 
                            onChange={handleChange} 
                            isTextArea={true}
                            placeholder="Descreva sua especialidade e abordagem (Ex: TCC, Psicanálise)..."
                        />
                    )}

                    <div className={styles.buttonContainer}>
                        <button type="submit" disabled={isSaving} className={styles.saveButton}>
                            <FiSave /> {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* O Modal de Senha (Comum a ambos) */}
            <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default SettingsPage;