// src/database/prisma/mappers/PrismaPacienteMapper.ts

import { Paciente as PrismaPaciente } from 'generated/prisma'; // Ou @prisma/client
import {
  Gender,
  Paciente,
  PatientStatus,
} from 'src/modules/user/entities/Paciente';

export class PrismaPacienteMapper {
  /**
   * Converte a entidade de domínio 'Paciente' para o formato de dados 
   * do Prisma.
   */
  static toPrisma(paciente: Paciente) {
    return {
      userId: paciente.userId,
      cpf: paciente.cpf,
      gender: paciente.gender,
      initial_observations: paciente.initial_observations,
      history: paciente.history,
      status: paciente.status,
      psicologo_responsavel_id: paciente.psicologo_responsavel_id,
    };
  }

  /**
   * Converte um objeto 'Paciente' vindo do Prisma para a sua
   * entidade de domínio 'Paciente'.
   */
  static toDomain(raw: PrismaPaciente): Paciente {
    return new Paciente(
      {
        userId: raw.userId,
        cpf: raw.cpf,
        gender: raw.gender as Gender, // Faz o type cast do enum
        status: raw.status as PatientStatus, // Faz o type cast do enum
        initial_observations: raw.initial_observations ?? null,
        history: raw.history ?? null,
        psicologo_responsavel_id: raw.psicologo_responsavel_id ?? null,
      },
      // (Assumindo que sua entidade Paciente não recebe um ID separado, 
      //  pois o userId já está nas props)
    );
  }
}