import { Injectable } from "@nestjs/common";
import { Paciente } from "src/modules/user/entities/Paciente";
import { PacienteRepository } from "src/modules/user/repositories/PacienteRepository";
import { PrismaService } from "../prisma.service";
import { PrismaPacienteMapper } from "../mappers/PrismaPacienteMapper";

@Injectable()
export class PrismaPacienteRepository implements PacienteRepository {
    constructor(private prisma: PrismaService) {}

    async findByCpfHash(cpfHash: string): Promise<Paciente | null> {
    
    const paciente = await this.prisma.paciente.findUnique({
      where: { cpfHash },
    });

    if (!paciente) {
      return null;
    }

    return PrismaPacienteMapper.toDomain(paciente);
  }

    async findByPsicologoId(psicologoId: string): Promise<(Paciente & { user: { name: string; email: string; photo_url: string | null } })[]> {
        const pacientes = await this.prisma.paciente.findMany({
            where: {
                psicologo_responsavel_id: psicologoId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        photo_url: true,
                    },
                },
            },
        });

        // Filtrar pacientes que têm user (não nulo) e mapear
        return pacientes
            .filter(p => p.user !== null)
            .map(p => PrismaPacienteMapper.toDomainWithUser(p as any));
            
    }
}

