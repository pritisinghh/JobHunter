import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from 'src/job/job.module';
import ResumeController from './resume.controller';
import { Resume } from './resume.model';
import ResumeService from './resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), JobModule],
  providers: [ResumeService],
  controllers: [ResumeController],
  exports: [ResumeService,TypeOrmModule],
})
export class ResumeModule {}
