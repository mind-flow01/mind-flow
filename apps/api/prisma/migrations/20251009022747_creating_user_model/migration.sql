-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PSICOLOGO', 'PACIENTE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ATIVO', 'ACOMPANHAMENTO', 'ALTA', 'INATIVO');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo_url" TEXT,
    "phone" TEXT,
    "role" "Role" NOT NULL,
    "account_status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Psicologo" (
    "userId" TEXT NOT NULL,
    "crp" TEXT NOT NULL,
    "bio" TEXT,
    "schedule_settings" JSONB,

    CONSTRAINT "Psicologo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "userId" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "initial_observations" TEXT,
    "history" TEXT,
    "status" "PatientStatus" NOT NULL DEFAULT 'ATIVO',
    "psicologo_responsavel_id" TEXT,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Psicologo_crp_key" ON "Psicologo"("crp");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- AddForeignKey
ALTER TABLE "Psicologo" ADD CONSTRAINT "Psicologo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_psicologo_responsavel_id_fkey" FOREIGN KEY ("psicologo_responsavel_id") REFERENCES "Psicologo"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
