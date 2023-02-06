import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import UserBoardJoinTable from 'src/join_tables/user-board-join-table.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class JobBoard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => BoardJobJoinTable, (jt) => jt.board)
  jobs: BoardJobJoinTable[];

  @OneToMany(() => UserBoardJoinTable, (jt) => jt.board)
  users: UserBoardJoinTable[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface JobBoardDto {
  title: string;
  description: string;
}

export interface JobBoardUpdateDto {
  id: string;
  title?: string;
  description?: string;
}
