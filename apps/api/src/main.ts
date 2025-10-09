import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0'); // 👈 importante!
  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();