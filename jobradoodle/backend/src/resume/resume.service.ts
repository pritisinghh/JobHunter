import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Resume, ResumeDto } from './resume.model';

@Injectable()
export default class ResumeService {
  constructor(
    @InjectRepository(Resume) private readonly repo: Repository<Resume>,
  ) {}

  async findAll(): Promise<Resume[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Resume> {
    return this.repo.findOneBy({ id: parseInt(id, 10) });
  }

  async getChildResumes(id: string): Promise<Resume[]> {
    const parentResumeId = parseInt(id, 10);
    return this.repo.find({
      select: {
        children: true,
      },
      where: {
        parent: {
          id: parentResumeId,
        },
      },
    });
  }

  async setParent(id: string, parentResumeId: string): Promise<UpdateResult> {
    const resumeId = parseInt(id, 10);
    const parentId = parseInt(parentResumeId, 10);
    return this.repo
      .createQueryBuilder()
      .update()
      .set({
        parent: {
          id: parentId,
        },
      })
      .where('id = :resumeId', { resumeId: resumeId })
      .execute();
  }

  async updateContent(id: string, content: string, json: object): Promise<UpdateResult> {
    const resumeId = parseInt(id, 10);
    return this.repo
      .createQueryBuilder()
      .update()
      .set({ content: content,
        jsonTemplate: json })
      .where('id = :resumeId', { resumeId: resumeId })
      .execute();
  }

  async create(resumeDto: ResumeDto): Promise<Resume> {
    return this.repo.create({ ...resumeDto }).save();
  }

  async getByJobId(jobId: string): Promise<Resume[]> {
    const jobId_ = parseInt(jobId, 10);
    return this.repo.find({
      where: {
        jobId: jobId_,
      },
    });
  }
}
