import User from 'src/auth/auth.model';
import JobBoard from 'src/job_board/job-board.model';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export default class UserBoardJoinTable extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  jobBoardId: number;

  @ManyToOne(() => JobBoard, (board) => board.users)
  @JoinColumn({ name: 'jobBoardId' })
  board: JobBoard;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'userId' })
  user: User;
}
