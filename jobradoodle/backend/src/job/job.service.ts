import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import { Repository } from 'typeorm';
import Job, { JobDto, JobStatus, JobUpdateStatusDto } from './job.model';

@Injectable()
export default class JobService {
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    @InjectRepository(BoardJobJoinTable)
    private readonly jtRepo: Repository<BoardJobJoinTable>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Job> {
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async create(jobDto: JobDto): Promise<Job> {
    return this.repo.create({ ...jobDto }).save();
  }

  async updateStatus(id: string, status: JobStatus) {
    const jobId = parseInt(id, 10);
    return this.repo
      .createQueryBuilder()
      .update(Job)
      .set({ status: status })
      .where('id = :jobId', { jobId: jobId })
      .execute();
  }

  async getJobBoards(id: string): Promise<BoardJobJoinTable[]> {
    const jobId = parseInt(id, 10);
    const data = this.jtRepo.find({
      relations: {
        board: true,
      },
      where: {
        jobId: jobId,
      },
    });

    return data;
  }
}
