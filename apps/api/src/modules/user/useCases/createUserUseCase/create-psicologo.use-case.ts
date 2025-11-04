import { Injectable, ConflictException } from "@nestjs/common";
import { hash } from "bcrypt";
import { Role, User } from "../../entities/User";
import { Psicologo } from "../../entities/Psicologo";
import { UserRepository } from "../../repositories/UserRepository";
import { PsicologoRepository } from "../../repositories/PsicologoRepository";

interface CreatePsicologoRequest {
    email: string;
    name: string;
    password: string;
    crp: string;
}

@Injectable()
export class CreatePsicologoUseCase {
    constructor(
        private userRepository: UserRepository,
        private psicologoRepository: PsicologoRepository,
    ) {}

    async execute({ email, name, password, crp }: CreatePsicologoRequest): Promise<User> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new ConflictException("Este endereço de email já está em uso.");
        }
        
        const psicologoWithSameCrp = await this.psicologoRepository.findByCrp(crp);
        if (psicologoWithSameCrp) {
            throw new ConflictException("Este CRP já está cadastrado.");
        }

        const user = new User({
            email,
            name,
            password: await hash(password, 10),
            role: Role.PSICOLOGO,
        });

        const psicologo = new Psicologo({
            userId: user.id,
            crp,
        });

        await this.userRepository.create(user, psicologo);

        return user;
    }
}