import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import axios from 'axios';

const pathToEnvFile = path.resolve(__dirname, '../../../', '.env');
export const REDIRECT_URI = `http://localhost:${process.env.BACKEND_PORT}/api/auth/callback`;

export const axiosInstance = axios.create({
  baseURL: `http://${process.env.MAILREADER_SERVICE_NAME}:${process.env.MAILREADER_PORT}`,
  timeout: 450000,
});

dotenv.config({ path: pathToEnvFile });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: [
      `http://${process.env.FRONTEND_SERVICE_NAME}:3000`,
      `http://localhost:3000`,
    ],
  });
  await app.listen(parseInt(process.env.BACKEND_PORT, 10));
}
bootstrap();
