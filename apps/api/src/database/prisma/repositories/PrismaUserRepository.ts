// repositories/prisma/PrismaUserRepository.ts

import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/User";
import { Psicologo } from "src/modules/user/entities/Psicologo";
import { Paciente } from "src/modules/user/entities/Paciente";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: User, profile: Psicologo | Paciente): Promise<void> {
        const userRaw = PrismaUserMapper.toPrisma(user);

        await this.prisma.user.create({
            data: {
                ...userRaw,
                psicologo: user.role === 'PSICOLOGO' ? {
                    create: {
                        crp: (profile as Psicologo).crp,
                        bio: (profile as Psicologo).bio,
                    }
                } : undefined,
                paciente: user.role === 'PACIENTE' ? {
                    create: {
                        cpf: (profile as Paciente).cpf,
                        gender: (profile as Paciente).gender,
                    }
                } : undefined
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;
        return PrismaUserMapper.toDomain(user);
    }
}