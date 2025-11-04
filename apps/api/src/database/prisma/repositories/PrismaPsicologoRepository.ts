import { Injectable } from "@nestjs/common";
import { Psicologo } from "src/modules/user/entities/Psicologo";
import { PsicologoRepository } from "src/modules/user/repositories/PsicologoRepository";
import { PrismaService } from "../prisma.service";
import { PrismaPsicologoMapper } from "../mappers/PrismaPsicologoMapper";

@Injectable()
export class PrismaPsicologoRepository implements PsicologoRepository {
    constructor(private prisma: PrismaService) {}

    async findByCrp(crp: string): Promise<Psicologo | null> {
        const psicologo = await this.prisma.psicologo.findUnique({
            where: { crp }
        });

        if (!psicologo) return null;
        return PrismaPsicologoMapper.toDomain(psicologo); 
    }
    
}