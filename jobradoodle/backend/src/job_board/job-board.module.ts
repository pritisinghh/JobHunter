import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from 'src/job/job.module';
import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import UserBoardJoinTable from 'src/join_tables/user-board-join-table.model';
import JobBoardController from './job-board.controller';
import JobBoard from './job-board.model';
import JobBoardService from './job-board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobBoard, BoardJobJoinTable, UserBoardJoinTable]),
    JobModule,
  ],
  providers: [JobBoardService],
  controllers: [JobBoardController],
  exports: [TypeOrmModule, JobBoardService],
})
export class JobBoardModule {}
