import { Module } from "@nestjs/common";
import { ConsultaController } from "./controller/consulta.controller";
import { DatabaseModule } from "src/database/database.module";
import { CreateConsultaUseCase } from "./useCases/create-consulta.use-case";
import { ListConsultasUseCase } from "./useCases/list-consultas.use-case";
import { ConsultaRepository } from "./repositories/ConsultaRepository";
import { PrismaConsultaRepository } from "src/database/prisma/repositories/PrismaConsultaRepository";

@Module({
    imports: [DatabaseModule],
    controllers: [ConsultaController],
    providers: [
        CreateConsultaUseCase,
        ListConsultasUseCase,
        {
            provide: ConsultaRepository,
            useClass: PrismaConsultaRepository,
        },
    ],
    exports: [ConsultaRepository],
})
export class ConsultaModule {}

