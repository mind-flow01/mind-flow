// src/shared/services/encryption.service.ts
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scryptSync, randomBytes } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor() {
    const secretKey = process.env.ENCRYPTION_KEY;
    if (!secretKey) {
      throw new Error('ENCRYPTION_KEY é obrigatória no .env');
    }
    this.key = scryptSync(secretKey, 'salt', 32);
  }

  encrypt(text: string): string {
    const iv = randomBytes(16);

    const cipher = createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    try {
      const parts = encryptedText.split(':');
      if (parts.length !== 2) {
        throw new Error('Formato de texto criptografado inválido');
      }

      const iv = Buffer.from(parts[0], 'hex');
      const encryptedData = parts[1];

      const decipher = createDecipheriv(this.algorithm, this.key, iv);
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Falha ao descriptografar:', error);
      throw new Error('Não foi possível descriptografar os dados.');
    }
  }
}