import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Job, { JobAutoUpdateStatusDto } from 'src/job/job.model';
import BoardJobJoinTable from 'src/join_tables/board-job-join-table.model';
import { Repository, UpdateResult } from 'typeorm';
import JobBoard, { JobBoardDto, JobBoardUpdateDto } from './job-board.model';

@Injectable()
export default class JobBoardService {
  constructor(
    @InjectRepository(JobBoard) private readonly repo: Repository<JobBoard>,
    @InjectRepository(BoardJobJoinTable)
    private readonly jtRepo: Repository<BoardJobJoinTable>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {}

  async findAll(): Promise<JobBoard[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<JobBoard> {
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async addJob(jobBoardId: string, jobId: string) {
    this.jtRepo
      .create({
        jobBoardId: parseInt(jobBoardId, 10),
        jobId: parseInt(jobId, 10),
      })
      .save();
  }

  async create(jobBoardDto: JobBoardDto): Promise<JobBoard> {
    return this.repo.create({ ...jobBoardDto }).save();
  }

  async update(id: string, jobBoardDto: JobBoardDto): Promise<JobBoard> {
    const jobBoard = await this.findOne(id);

    if (jobBoardDto.description) jobBoard.description = jobBoardDto.description;

    if (jobBoardDto.title) jobBoard.title = jobBoardDto.title;

    return await jobBoard.save();
  }

  async updateJobStatusFromMailData(
    id: string,
    jobEmailData: JobAutoUpdateStatusDto[],
  ) {
    // fetch jobs on board
    const jobs: Job[] = (await this.getJobs(id)).map((result) => result.job);

    if (!jobs || jobs.length == 0) {
      for await (const emailJob of jobEmailData) {
        const newJob = await this.jobRepo.create({ ...emailJob }).save();
        await this.addJob(id, newJob.id.toString());
      }
    } else {
      for await (const job of jobs) {
        for await (const emailJob of jobEmailData) {
          if (
            job.role &&
            job.companyName &&
            emailJob.companyName.toLowerCase() ==
              job.companyName.toLowerCase() &&
            emailJob.role.toLowerCase() == job.companyName.toLowerCase()
          ) {
            job.status = emailJob.status;
            await job.save();
          } else {
            const newJob = await this.jobRepo.create({ ...emailJob }).save();
            await this.addJob(id, newJob.id.toString());
          }
        }
      }
    }
  }

  async getJobs(id: string): Promise<BoardJobJoinTable[]> {
    const jobBoardId = parseInt(id, 10);
    const data = this.jtRepo.find({
      relations: {
        job: true,
      },
      where: {
        jobBoardId: jobBoardId,
      },
    });
    console.log('returning jobs');
    return data;
  }
}
