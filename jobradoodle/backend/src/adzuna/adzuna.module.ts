import { Module } from '@nestjs/common';
import { AdzunaController } from './adzuna.controller';
import AuthService from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdzunaController],
  providers: [AuthService],
})
export class AdzunaModule {}
