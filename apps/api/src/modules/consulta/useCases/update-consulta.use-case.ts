import { Injectable, NotFoundException } from "@nestjs/common";
import { Consulta, ConsultaStatus } from "../entities/Consulta";
import { ConsultaRepository } from "../repositories/ConsultaRepository";
import { PrismaService } from "src/database/prisma/prisma.service";

interface UpdateConsultaRequest {
    id: string;
    paciente_id?: string;
    horario?: Date;
    tipo?: string;
    categoria?: string;
    tags?: string[];
    status?: ConsultaStatus;
    sugestao_IA?: string;
<<<<<<< HEAD
    transcricao_id?: string;
=======
>>>>>>> 130dc13 (Cria rotas de update e delete de consultas)
}

@Injectable()
export class UpdateConsultaUseCase {
    constructor(
        private consultaRepository: ConsultaRepository,
        private prisma: PrismaService,
    ) {}

<<<<<<< HEAD
    async execute({ id, paciente_id, horario, tipo, categoria, tags, status, sugestao_IA, transcricao_id }: UpdateConsultaRequest): Promise<Consulta> {
=======
    async execute({ id, paciente_id, horario, tipo, categoria, tags, status, sugestao_IA }: UpdateConsultaRequest): Promise<Consulta> {
>>>>>>> 130dc13 (Cria rotas de update e delete de consultas)
        // Buscar consulta existente
        const consultaExistente = await this.consultaRepository.findById(id);

        if (!consultaExistente) {
            throw new NotFoundException("Consulta não encontrada.");
        }

        // Se paciente_id foi fornecido, verificar se o paciente existe
        if (paciente_id) {
            const paciente = await this.prisma.paciente.findUnique({
                where: { userId: paciente_id },
            });

            if (!paciente) {
                throw new NotFoundException("Paciente não encontrado.");
            }
        }

        // Atualizar apenas os campos fornecidos
        if (paciente_id !== undefined) consultaExistente.paciente_id = paciente_id;
        if (horario !== undefined) consultaExistente.horario = horario;
        if (tipo !== undefined) consultaExistente.tipo = tipo;
        if (categoria !== undefined) consultaExistente.categoria = categoria;
        if (tags !== undefined) consultaExistente.tags = tags;
        if (status !== undefined) consultaExistente.status = status;
        if (sugestao_IA !== undefined) consultaExistente.sugestao_IA = sugestao_IA;
<<<<<<< HEAD
        if (transcricao_id !== undefined) consultaExistente.transcricao_id = transcricao_id;
=======
>>>>>>> 130dc13 (Cria rotas de update e delete de consultas)

        await this.consultaRepository.update(consultaExistente);

        return consultaExistente;
    }
}
