import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import type { AuthRequestModel } from "../models/authRequestModel";
import { SignInUseCase } from "../useCases/signInUseCases";
import { LocalAuthGuard } from "../guards/localAuth.guard";
import { JwtAuthGuard } from "../guards/jwtAuth.guard";
import { Public } from "../decorators/isPublic";

@Controller()
export class AuthController {

    constructor(private signInUseCase: SignInUseCase){}
    
    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async singIn(@Request() request : AuthRequestModel) {
        const access_token = await this.signInUseCase.execute({user: request.user});
        return {
            id: request.user.id,
            name: request.user.name,
            email: request.user.email,
            accessToken: access_token
        };
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async test(@Request() request : any) {
        console.log(request.user);
        return 'test';
    }
}