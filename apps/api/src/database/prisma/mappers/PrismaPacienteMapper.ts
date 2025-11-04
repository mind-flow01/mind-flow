// src/database/prisma/mappers/PrismaPacienteMapper.ts

import { Paciente as PrismaPaciente } from "generated/prisma"; // ou "@prisma/client"
import { Paciente, Gender, PatientStatus } from "src/modules/user/entities/Paciente";

export class PrismaPacienteMapper {
  /**
   * Converte a entidade de domínio 'Paciente' para o formato de dados do Prisma.
   */
  static toPrisma(paciente: Paciente) {
    return {
      userId: paciente.userId,
      cpf: paciente.cpf,
      cpfHash: paciente.cpfHash,
      gender: paciente.gender,
      initial_observations: paciente.initial_observations,
      history: paciente.history,
      status: paciente.status,
      psicologo_responsavel_id: paciente.psicologo_responsavel_id,
    };
  }
    static toDomain(raw: PrismaPaciente): Paciente {
        return new Paciente({
            userId: raw.userId,
            cpf: raw.cpf,
            gender: raw.gender as Gender,
            cpfHash: raw.cpfHash,
            initial_observations: raw.initial_observations,
            history: raw.history,
            status: raw.status as PatientStatus,
            psicologo_responsavel_id: raw.psicologo_responsavel_id,
        });
    }

    static toDomainWithUser(raw: PrismaPaciente & { user: { name: string; email: string; photo_url: string | null } | null }): Paciente & { user: { name: string; email: string; photo_url: string | null } } {
        const paciente = PrismaPacienteMapper.toDomain(raw);
        
        // Verificar se user existe (não é null)
        if (!raw.user) {
            throw new Error(`Paciente com userId ${raw.userId} não possui usuário associado.`);
        }
        
        // Criar um objeto plano com todas as propriedades explicitamente, pois getters não são copiados no spread
        // Incluir todas as propriedades necessárias para garantir que o userId esteja presente
        return {
            userId: paciente.userId, // Propriedade direta (não getter)
            cpf: paciente.cpf,
            gender: paciente.gender,
            initial_observations: paciente.initial_observations,
            history: paciente.history,
            status: paciente.status,
            psicologo_responsavel_id: paciente.psicologo_responsavel_id,
            user: {
                name: raw.user.name,
                email: raw.user.email,
                photo_url: raw.user.photo_url,
            },
        } as any;
    }
}

  /**
   * Converte um objeto 'Paciente' vindo do Prisma para a entidade de domínio 'Paciente'.
   */
  static toDomain(raw: PrismaPaciente): Paciente {
    return new Paciente(
      {
        userId: raw.userId,
        cpf: raw.cpf,
        cpfHash: raw.cpfHash,
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

  /**
   * Converte um 'Paciente' do Prisma incluindo os dados do usuário associado.
   */
  static toDomainWithUser(
    raw: PrismaPaciente & {
      user: { name: string; email: string; photo_url: string | null } | null;
    }
  ): Paciente & {
    user: { name: string; email: string; photo_url: string | null };
  } {
    const paciente = PrismaPacienteMapper.toDomain(raw);

    if (!raw.user) {
      throw new Error(`Paciente com userId ${raw.userId} não possui usuário associado.`);
    }

    // Retorna um objeto plano com todos os campos e o user
    return {
      userId: paciente.userId,
      cpf: paciente.cpf,
      gender: paciente.gender,
      initial_observations: paciente.initial_observations,
      history: paciente.history,
      status: paciente.status,
      psicologo_responsavel_id: paciente.psicologo_responsavel_id,
      user: {
        name: raw.user.name,
        email: raw.user.email,
        photo_url: raw.user.photo_url,
      },
    } as any;
  }
}
