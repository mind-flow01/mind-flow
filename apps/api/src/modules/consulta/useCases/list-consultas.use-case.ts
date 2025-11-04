import { Injectable } from "@nestjs/common";
import { ConsultaRepository } from "../repositories/ConsultaRepository";
import { PrismaConsultaRepository } from "src/database/prisma/repositories/PrismaConsultaRepository";

@Injectable()
export class ListConsultasUseCase {
    constructor(
        private consultaRepository: ConsultaRepository,
    ) {}

    async execute() {
        if (this.consultaRepository instanceof PrismaConsultaRepository) {
            return await this.consultaRepository.findAllWithPaciente();
        }
        
        const consultas = await this.consultaRepository.findAll();
        return consultas;
    }
}

