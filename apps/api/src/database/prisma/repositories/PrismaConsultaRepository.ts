import { Injectable } from "@nestjs/common";
import { Consulta } from "src/modules/consulta/entities/Consulta";
import { ConsultaRepository } from "src/modules/consulta/repositories/ConsultaRepository";
import { PrismaService } from "../prisma.service";
import { PrismaConsultaMapper } from "../mappers/PrismaConsultaMapper";

@Injectable()
export class PrismaConsultaRepository implements ConsultaRepository {
    constructor(private prisma: PrismaService) {}

    async create(consulta: Consulta): Promise<void> {
        const consultaRaw = PrismaConsultaMapper.toPrisma(consulta);

        await this.prisma.consulta.create({
            data: consultaRaw,
        });
    }

    async findById(id: string): Promise<Consulta | null> {
        const consulta = await this.prisma.consulta.findUnique({
            where: { id },
        });

        if (!consulta) return null;
        return PrismaConsultaMapper.toDomain(consulta);
    }

    async findByPacienteId(paciente_id: string): Promise<Consulta[]> {
        const consultas = await this.prisma.consulta.findMany({
            where: { paciente_id },
            orderBy: { horario: 'asc' },
        });

        return consultas.map(PrismaConsultaMapper.toDomain);
    }

    async findAll(): Promise<Consulta[]> {
        const consultas = await this.prisma.consulta.findMany({
            include: {
                paciente: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: { horario: 'asc' },
        });

        return consultas.map((consulta) => PrismaConsultaMapper.toDomain(consulta));
    }

    async findAllWithPaciente() {
        const consultas = await this.prisma.consulta.findMany({
            include: {
                paciente: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: { horario: 'asc' },
        });

        return consultas.map((consultaRaw) => {
            const consulta = PrismaConsultaMapper.toDomain(consultaRaw);
            // Garantir que todas as propriedades estejam explicitamente incluídas, pois getters não são copiados no spread
            return {
                id: consulta.id,
                paciente_id: consulta.paciente_id,
                horario: consulta.horario,
                tipo: consulta.tipo,
                categoria: consulta.categoria,
                tags: consulta.tags,
                status: consulta.status,
                created_at: consulta.created_at,
                updatedAt: consulta.updatedAt,
                paciente: consultaRaw.paciente ? {
                    user: {
                        name: consultaRaw.paciente.user.name,
                    },
                } : null,
            };
        });
    }
}

