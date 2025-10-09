import { Controller, Post, Body } from '@nestjs/common';
import { UserViewModel } from '../viewModel/UserViewModel';
import { Public } from 'src/modules/auth/decorators/isPublic';
import { CreatePsicologoBody } from '../dto/create-psicologo.dto';
import { CreatePacienteBody } from '../dto/create-paciente.dto';
import { CreatePsicologoUseCase } from '../useCases/createUserUseCase/create-psicologo.use-case';
import { CreatePacienteUseCase } from '../useCases/createUserUseCase/create-paciente.use-case';

@Controller('users')
export class UserController {
  constructor(
    private createPsicologoUseCase: CreatePsicologoUseCase,
    private createPacienteUseCase: CreatePacienteUseCase,
  ) {}

  @Post('psicologo')
  @Public()
  async createPsicologo(@Body() body: CreatePsicologoBody) {
    const { email, name, password, crp } = body;
    const user = await this.createPsicologoUseCase.execute({ 
      email, 
      name, 
      password, 
      crp 
    });
    return UserViewModel.toHttp(user);
  }

  @Post('paciente')
  @Public()
  async createPaciente(@Body() body: CreatePacienteBody) {
    const { email, name, password, cpf, gender } = body;
    const user = await this.createPacienteUseCase.execute({ 
      email, 
      name, 
      password, 
      cpf, 
      gender 
    });
    return UserViewModel.toHttp(user);
  }
}