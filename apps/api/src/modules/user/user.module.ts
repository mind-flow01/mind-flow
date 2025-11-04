import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { DatabaseModule } from "src/database/database.module";
import { CreatePsicologoUseCase } from "./useCases/createUserUseCase/create-psicologo.use-case";
import { CreatePacienteUseCase } from "./useCases/createUserUseCase/create-paciente.use-case";
import { UserRepository } from "./repositories/UserRepository";
import { PrismaUserRepository } from "src/database/prisma/repositories/PrismaUserRepository";
import { PsicologoRepository } from "./repositories/PsicologoRepository";
import { PrismaPsicologoRepository } from "src/database/prisma/repositories/PrismaPsicologoRepository";
import { PacienteRepository } from "./repositories/PacienteRepository";
import { PrismaPacienteRepository } from "src/database/prisma/repositories/PrismaPacienteRepository";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        CreatePsicologoUseCase,
        CreatePacienteUseCase,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: PsicologoRepository,
            useClass: PrismaPsicologoRepository,
        },
        {
            provide: PacienteRepository,
            useClass: PrismaPacienteRepository,
        },
    ],
})
export class UserModule {}