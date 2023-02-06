import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Job from '../job/job.model';
import JobBoard from '../job_board/job-board.model';
import * as dotenv from 'dotenv';
import * as path from 'path';
import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import { Resume } from 'src/resume/resume.model';
import User from 'src/auth/auth.model';

dotenv.config({ path: path.resolve(__dirname, '../../../../', '.env') });

export const dataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || undefined,
  synchronize: true,
  autoLoadEntities: true,
  entities: [Job, JobBoard, BoardJobJoinTable, Resume, User],
};
