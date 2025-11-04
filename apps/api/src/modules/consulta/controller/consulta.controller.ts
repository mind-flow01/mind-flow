import { Controller, Post, Get, Body } from '@nestjs/common';
import { ConsultaViewModel } from '../viewModel/ConsultaViewModel';
import { CreateConsultaBody } from '../dto/create-consulta.dto';
import { CreateConsultaUseCase } from '../useCases/create-consulta.use-case';
import { ListConsultasUseCase } from '../useCases/list-consultas.use-case';

@Controller('consultas')
export class ConsultaController {
  constructor(
    private createConsultaUseCase: CreateConsultaUseCase,
    private listConsultasUseCase: ListConsultasUseCase,
  ) {}

  @Post()
  async createConsulta(@Body() body: CreateConsultaBody) {
    const { paciente_id, horario, tipo, categoria, tags, status } = body;
    const consulta = await this.createConsultaUseCase.execute({ 
      paciente_id, 
      horario: new Date(horario),
      tipo, 
      categoria,
      tags,
      status,
    });
    return ConsultaViewModel.toHttp(consulta);
  }

  @Get()
  async listConsultas() {
    const consultas = await this.listConsultasUseCase.execute();
    return consultas.map((consulta) => {
      if ('paciente' in consulta) {
        return ConsultaViewModel.toHttpWithPaciente(consulta as any);
      }
      return ConsultaViewModel.toHttp(consulta);
    });
  }
}

