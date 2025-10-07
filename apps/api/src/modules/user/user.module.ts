import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { CreateUserUseCase } from "./useCases/createUserUseCase/createUserUseCase";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [CreateUserUseCase],
})
export class UserModule {}