import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserUseCase } from '../useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from '../dto/userBody';
import { UserViewModel } from '../viewModel/UserViewModel';


@Controller('users')
export class UserController {
  constructor(private createUserUseCase : CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const {email, name, password} = body
    const user = await this.createUserUseCase.execute({email, name, password});
    return UserViewModel.toHttp(user)
  }
}
