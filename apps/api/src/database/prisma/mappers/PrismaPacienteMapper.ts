import { Paciente as PrismaPaciente } from "generated/prisma";
import { Paciente, Gender, PatientStatus } from "src/modules/user/entities/Paciente";

export class PrismaPacienteMapper {
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

