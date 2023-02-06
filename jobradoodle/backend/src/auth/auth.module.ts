import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthService from 'src/auth/auth.service';
import { JobModule } from 'src/job/job.module';
import { JobBoardModule } from 'src/job_board/job-board.module';
import JobBoardService from 'src/job_board/job-board.service';
import UserBoardJoinTable from 'src/join_tables/user-board-join-table.model';
import AuthController from './auth.controller';
import GoogleStrategy from './auth.google-strategy';
import User from './auth.model';
import SessionSerializer from './auth.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserBoardJoinTable]),
    JobBoardModule,
    JobModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer, JobBoardService],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
