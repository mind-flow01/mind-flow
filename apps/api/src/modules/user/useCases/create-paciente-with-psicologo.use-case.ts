import { Injectable, ConflictException, ForbiddenException } from "@nestjs/common";
import { hash } from "bcrypt";
import { Role, User } from "../entities/User";
import { Gender, Paciente } from "../entities/Paciente";
import { UserRepository } from "../repositories/UserRepository";
import { PacienteRepository } from "../repositories/PacienteRepository";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreatePacienteWithPsicologoRequest {
    email: string;
    name: string;
    password: string;
    cpf: string;
    gender: Gender;
    psicologoId: string;
}

@Injectable()
export class CreatePacienteWithPsicologoUseCase {
    constructor(
        private userRepository: UserRepository,
        private pacienteRepository: PacienteRepository,
        private prisma: PrismaService,
    ) {}

    async execute({ email, name, password, cpf, gender, psicologoId }: CreatePacienteWithPsicologoRequest): Promise<User> {
        // Verificar se o psicólogo existe
        const psicologo = await this.prisma.psicologo.findUnique({
            where: { userId: psicologoId },
        });

        if (!psicologo) {
            throw new ForbiddenException("Usuário não é um psicólogo ou não foi encontrado.");
        }

        // Verificar se o email já está em uso
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new ConflictException("Este endereço de email já está em uso.");
        }

        // Verificar se o CPF já está cadastrado
        const pacienteWithSameCpf = await this.pacienteRepository.findByCpf(cpf);
        if (pacienteWithSameCpf) {
            throw new ConflictException("Este CPF já está cadastrado.");
        }

        // Criar o usuário
        const user = new User({
            email,
            name,
            password: await hash(password, 10),
            role: Role.PACIENTE,
        });

        // Criar o paciente associado ao psicólogo
        const paciente = new Paciente({
            userId: user.id,
            cpf,
            gender,
            psicologo_responsavel_id: psicologoId,
        });

        // Salvar usuário e paciente
        await this.userRepository.create(user, paciente);

        return user;
    }
}
