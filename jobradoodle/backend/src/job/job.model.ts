import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum JobStatus {
  WISHLIST = 'WISHLIST',
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  NO_OFFER = 'NO_OFFER',
}

@Entity()
export default class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  requisitionId: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.APPLIED })
  status: JobStatus;

  @Column({ nullable: true })
  companyName: string;

  @OneToMany(() => BoardJobJoinTable, (jt) => jt.job)
  boards: BoardJobJoinTable[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface JobDto {
  role: string;
  description?: string;
  requisitionId?: string;
  status?: JobStatus;
  companyName?: string;
}

export interface JobUpdateStatusDto {
  id: string;
  status: JobStatus;
}

export interface JobAutoUpdateStatusDto {
  status: JobStatus;
  role: string;
  companyName: string;
}
