import { Paciente } from "../entities/Paciente";

export abstract class PacienteRepository {
    abstract findByCpf(cpf: string): Promise<Paciente | null>;
}