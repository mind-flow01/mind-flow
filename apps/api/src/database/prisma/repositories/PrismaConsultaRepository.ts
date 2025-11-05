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

    async findAllWithPaciente(psicologoId?: string) {
        const whereClause: any = {};

        // Se psicologoId for fornecido, filtrar apenas consultas dos pacientes desse psicólogo
        if (psicologoId) {
            whereClause.paciente = {
                psicologo_responsavel_id: psicologoId,
            };
        }

        const consultas = await this.prisma.consulta.findMany({
            where: whereClause,
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
                transcricao: true,
            } as any,
            orderBy: { horario: 'asc' },
        });

        return consultas.map((consultaRaw: any) => {
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
                sugestao_IA: consulta.sugestao_IA,
<<<<<<< HEAD
                transcricao_id: consulta.transcricao_id,
=======
>>>>>>> 130dc13 (Cria rotas de update e delete de consultas)
                created_at: consulta.created_at,
                updatedAt: consulta.updatedAt,
                paciente: consultaRaw.paciente ? {
                    user: {
                        name: consultaRaw.paciente.user.name,
                    },
                } : null,
                transcricao: (consultaRaw as any).transcricao ? {
                    id: (consultaRaw as any).transcricao.id,
                    id_consulta: (consultaRaw as any).transcricao.id_consulta,
                    texto_gerado: (consultaRaw as any).transcricao.texto_gerado,
                    data_geracao: (consultaRaw as any).transcricao.data_geracao,
                    status: (consultaRaw as any).transcricao.status,
                } : null,
            };
        });
    }

    async update(consulta: Consulta): Promise<void> {
        const consultaRaw = PrismaConsultaMapper.toPrisma(consulta);
        await this.prisma.consulta.update({
            where: { id: consulta.id },
            data: {
                paciente_id: consultaRaw.paciente_id,
                horario: consultaRaw.horario,
                tipo: consultaRaw.tipo,
                categoria: consultaRaw.categoria,
                tags: consultaRaw.tags,
                status: consultaRaw.status,
                sugestao_IA: consultaRaw.sugestao_IA,
<<<<<<< HEAD
                transcricao_id: consultaRaw.transcricao_id,
=======
>>>>>>> 130dc13 (Cria rotas de update e delete de consultas)
                updatedAt: new Date(),
            } as any,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.consulta.delete({
            where: { id },
        });
    }
}

