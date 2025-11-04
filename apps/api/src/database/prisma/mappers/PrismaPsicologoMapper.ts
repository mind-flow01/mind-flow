import { Psicologo as PrismaPsicologo, Prisma } from 'generated/prisma'; // Ou @prisma/client
import { Psicologo } from 'src/modules/user/entities/Psicologo';

export class PrismaPsicologoMapper {
  /**
   * Converte uma entidade de domínio 'Psicologo' para o formato de dados 
   * esperado pelo Prisma (para create, update, etc.).
   */
  static toPrisma(psicologo: Psicologo) {
    return {
      userId: psicologo.userId,
      crp: psicologo.crp,
      bio: psicologo.bio,
      
      // O Prisma espera 'Prisma.JsonValue' para campos JSON.
      // Se 'schedule_settings' for um objeto, ele é compatível.
      schedule_settings: psicologo.schedule_settings as Prisma.JsonValue, 
    };
  }

  /**
   * Converte um objeto 'Psicologo' vindo do Prisma para a sua
   * entidade de domínio 'Psicologo'.
   */
  static toDomain(raw: PrismaPsicologo): Psicologo {
    // Assumindo que seu construtor da entidade Psicologo
    // recebe um objeto de propriedades, assim como no seu UseCase.
    return new Psicologo(
      {
        userId: raw.userId,
        crp: raw.crp,
        
        // Garante 'null' em vez de 'undefined' se o campo for opcional
        bio: raw.bio ?? null, 
        schedule_settings: raw.schedule_settings ?? null,
        
        // created_at e updatedAt não existem no seu schema do Psicologo,
        // então não são mapeados aqui.
      },
      // Diferente do User, o ID do Psicologo (userId) já está
      // dentro das propriedades, então não é passado como segundo argumento.
    );
  }
}