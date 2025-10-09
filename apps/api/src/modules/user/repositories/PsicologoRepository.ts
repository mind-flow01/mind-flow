import { Psicologo } from "../entities/Psicologo";

export abstract class PsicologoRepository {
    abstract findByCrp(crp: string): Promise<Psicologo | null>;
}