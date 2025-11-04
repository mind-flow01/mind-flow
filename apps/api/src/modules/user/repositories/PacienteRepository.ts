import { Paciente } from "../entities/Paciente";

export abstract class PacienteRepository {
    abstract findByCpfHash(cpfHash: string): Promise<Paciente | null>;
}