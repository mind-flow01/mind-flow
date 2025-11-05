import { Controller, Post, Get, Body, Request, UnauthorizedException, Param, ForbiddenException } from '@nestjs/common';
import { UserViewModel } from '../viewModel/UserViewModel';
import { PacienteViewModel } from '../viewModel/PacienteViewModel';
import { Public } from 'src/modules/auth/decorators/isPublic';
import { CreatePsicologoBody } from '../dto/create-psicologo.dto';
import { CreatePacienteBody } from '../dto/create-paciente.dto';
import { CreatePsicologoUseCase } from '../useCases/createUserUseCase/create-psicologo.use-case';
import { CreatePacienteUseCase } from '../useCases/createUserUseCase/create-paciente.use-case';
import { CreatePacienteWithPsicologoUseCase } from '../useCases/create-paciente-with-psicologo.use-case';
import { ListPacientesUseCase } from '../useCases/list-pacientes.use-case';
import { GetPacienteProfileUseCase } from '../useCases/getUserUseCase/getPacienteUseCase';

@Controller('users')
export class UserController {
  constructor(
    private createPsicologoUseCase: CreatePsicologoUseCase,
    private createPacienteUseCase: CreatePacienteUseCase,
    private createPacienteWithPsicologoUseCase: CreatePacienteWithPsicologoUseCase,
    private listPacientesUseCase: ListPacientesUseCase,
    private getPacienteProfileUseCase: GetPacienteProfileUseCase,
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
  @Get('paciente/:id') 
  async getPacienteById(
    @Param('id') pacienteId: string,
    @Request() request: any,   
  ) {
    const pacienteProfile = await this.getPacienteProfileUseCase.execute(pacienteId);
    return pacienteProfile;
  }

  @Post('patients')
  async createPatient(@Request() request: any, @Body() body: CreatePacienteBody) {
    const psicologoId = request.user.id; // ID do usuário logado (que é o userId do psicólogo)
    console.log(request.user)
    const { email, name, password, cpf, gender } = body;
    const user = await this.createPacienteWithPsicologoUseCase.execute({
      email, 
      name, 
      password, 
      cpf, 
      gender,
      psicologoId,
    });
    return UserViewModel.toHttp(user);
  }

  @Get('patients')
  async getPatients(@Request() request: any) {
    const psicologoId = request.user.id; // ID do usuário logado (que é o userId do psicólogo)
    const pacientes = await this.listPacientesUseCase.execute({ psicologoId });
    return PacienteViewModel.toHttpList(pacientes);
  }
}