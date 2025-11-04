import { Injectable } from '@nestjs/common';
import { Paciente } from 'src/modules/user/entities/Paciente';
import { PacienteRepository } from 'src/modules/user/repositories/PacienteRepository';
import { PrismaService } from '../prisma.service';
import { PrismaPacienteMapper } from '../mappers/PrismaPacienteMapper';

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
}