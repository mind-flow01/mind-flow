import { Injectable, ConflictException } from "@nestjs/common";
import { hash } from "bcrypt";
import { Role, User } from "../../entities/User";
import { Gender, Paciente } from "../../entities/Paciente";
import { UserRepository } from "../../repositories/UserRepository";
import { PacienteRepository } from "../../repositories/PacienteRepository";


interface CreatePacienteRequest {
    email: string;
    name: string;
    password: string;
    cpf: string;
    gender: Gender;
}

@Injectable()
export class CreatePacienteUseCase {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async execute({ email, name, password, cpf, gender }: CreatePacienteRequest): Promise<User> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new ConflictException("Este endereço de email já está em uso.");
        }
        
        // const pacienteWithSameCpf = await this.pacienteRepository.findByCpf(cpf);
        // if (pacienteWithSameCpf) {
        //     throw new ConflictException("Este CPF já está cadastrado.");
        // }
        
        const user = new User({
            email,
            name,
            password: await hash(password, 10),
            role: Role.PACIENTE,
        });

        const paciente = new Paciente({
            userId: user.id,
            cpf,
            gender,
        });

        await this.userRepository.create(user, paciente);

        return user;
    }
}