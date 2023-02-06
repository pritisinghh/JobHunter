import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './utils/data-source';
import { JobBoardModule } from './job_board/job-board.module';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume.module';
import { ResumeMakerModule } from './resume_maker/resume_maker.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AdzunaModule } from './adzuna/adzuna.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    JobBoardModule,
    JobModule,
    ResumeModule,
    ResumeMakerModule,
    AuthModule,
    AdzunaModule,
    PassportModule.register({ session: true }),
  ],
})
export class AppModule {}
