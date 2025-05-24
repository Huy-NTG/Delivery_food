import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true, // Nếu bạn cần gửi cookies
  });
  await app.listen(3000);
}
bootstrap();