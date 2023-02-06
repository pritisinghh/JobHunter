import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import JobController from './job.controller';
import Job from './job.model';
import JobService from './job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, BoardJobJoinTable])],
  providers: [JobService],
  controllers: [JobController],
  exports: [TypeOrmModule],
})
export class JobModule {}
