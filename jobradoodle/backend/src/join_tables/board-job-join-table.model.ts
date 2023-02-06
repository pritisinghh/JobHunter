import Job from 'src/job/job.model';
import JobBoard from 'src/job_board/job-board.model';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export default class BoardJobJoinTable extends BaseEntity {
  @PrimaryColumn()
  jobBoardId: number;

  @PrimaryColumn()
  jobId: number;

  @ManyToOne(() => JobBoard, (board) => board.jobs)
  @JoinColumn({ name: 'jobBoardId' })
  board: JobBoard;

  @ManyToOne(() => Job, (job) => job.boards)
  @JoinColumn({ name: 'jobId' })
  job: Job;
}
