import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { EncryptionService } from "src/modules/services/encryptionService";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UpdatePsicologoDto } from "../../dto/update-psicologo.dto";

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    private prisma: PrismaService,
    private encryptionService: EncryptionService,
  ) {}

  async execute(userId: string, userData: UpdateUserDto, profileData?: UpdatePsicologoDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        psicologo: true,
        paciente: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    // Preparar dados para atualização do User
    const userUpdate: any = {};

    if (userData.name) {
      userUpdate.name = this.encryptionService.encrypt(userData.name);
    }

    if (userData.email) {
      // Se mudar email, precisa atualizar hash também
      const { createHash } = require('crypto');
      const emailHash = createHash('sha256')
        .update(userData.email)
        .digest('hex');
      userUpdate.email = this.encryptionService.encrypt(userData.email);
      userUpdate.emailHash = emailHash;
    }

    if (userData.phone !== undefined) {
      userUpdate.phone = userData.phone;
    }

    if (userData.photo_url !== undefined) {
      userUpdate.photo_url = userData.photo_url;
    }

    // Atualizar User
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: userUpdate,
    });

    // Atualizar perfil específico se fornecido
    if (profileData && user.role === 'PSICOLOGO' && user.psicologo) {
      const psicologoUpdate: any = {};

      if (profileData.bio !== undefined) {
        psicologoUpdate.bio = profileData.bio;
      }

      if (profileData.schedule_settings !== undefined) {
        psicologoUpdate.schedule_settings = profileData.schedule_settings;
      }

      await this.prisma.psicologo.update({
        where: { userId },
        data: psicologoUpdate,
      });
    }

    // Buscar dados atualizados completos (com perfil)
    const updatedUserWithProfile = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        psicologo: true,
        paciente: true,
      },
    });

    if (!updatedUserWithProfile) {
      throw new NotFoundException("Usuário não encontrado após atualização");
    }

    // Descriptografar antes de retornar
    let finalUser: any = { ...updatedUserWithProfile };
    try {
      if (finalUser.name) finalUser.name = this.encryptionService.decrypt(finalUser.name);
      if (finalUser.email) finalUser.email = this.encryptionService.decrypt(finalUser.email);

      if (finalUser.psicologo) {
        finalUser.psicologo = {
          ...finalUser.psicologo,
          crp: this.encryptionService.decrypt(finalUser.psicologo.crp),
        };
      }

      if (finalUser.paciente && finalUser.paciente.cpf) {
        finalUser.paciente = {
          ...finalUser.paciente,
          cpf: this.encryptionService.decrypt(finalUser.paciente.cpf),
        };
      }
    } catch (e) {
      console.warn("Falha ao descriptografar retorno:", e);
    }

    return {
      message: "Dados atualizados com sucesso",
      user: finalUser,
    };
  }
}

