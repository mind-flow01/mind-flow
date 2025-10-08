import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { AuthRequestModel } from "../models/authRequestModel";
import { SignInUseCase } from "../useCases/signInUseCases";

@Controller()
export class AuthController {

    constructor(private signInUseCase: SignInUseCase){}

    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async singIn(@Request() request : AuthRequestModel) {
        const access_token = await this.signInUseCase.execute({user: request.user});
        return {access_token};
    }
}