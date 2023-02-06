import { Res } from '@nestjs/common';
import Job from 'src/job/job.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Resume, (resume) => resume.children, { nullable: true })
  parent: Resume;

  @OneToMany(() => Resume, (resume) => resume.parent, { nullable: true })
  children: Resume[];

  @OneToOne(() => Job, (job) => job.id, { nullable: true })
  jobId: number;

  @Column('text', { nullable: true })
  content: string;

  @Column('jsonb', { nullable: true })
  jsonTemplate: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface ResumeDto {
  parentResumeId?: number;
  jobId?: number;
  content?: string;
  jsonTemplate?: object;
}

export interface ResumeContentUpdateDto {
  id: string;
  content?: string;
  jsonTemplate?: object;
}

export interface ResumeSetParentDto {
  resumeId: string;
  parentResumeId: string;
}
