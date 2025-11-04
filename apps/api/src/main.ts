import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common'; 
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  let app: INestApplication;
  let protocol = 'http'; 
  const port = process.env.PORT ?? 3001;

  if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode (HTTPS)');
    protocol = 'https';
    const httpsOptions = {
      key: readFileSync(join(__dirname, '..', 'certs', 'key.pem')),
      cert: readFileSync(join(__dirname, '..', 'certs', 'cert.pem')),
    };

    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });

  } else {
    console.log('Running in development mode (HTTP)');
    app = await NestFactory.create(AppModule);
  }

  app.enableCors({
    origin: true, // Permite todas as origens (ou você pode especificar ['http://localhost:3000'])
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');

  console.log(`🚀 Server running on ${protocol}://localhost:${port}`);
}

bootstrap();