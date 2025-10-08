import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { ValidateUserUseCase } from "./useCases/validateUserUseCases";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/database/database.module";
import { SignInDTOValidateMiddleware } from "./middleware/signInDTOValidate.Middleware";
import { SignInUseCase } from "./useCases/signInUseCases";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [DatabaseModule ,UserModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: "3 days"}
    })],
    controllers: [AuthController],
    providers: [LocalStrategy, ValidateUserUseCase, SignInUseCase],
})

export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn')
    }
}