import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JobDto, JobUpdateStatusDto } from 'src/job/job.model';
import JobService from './job.service';
@Controller('/api/job')
export default class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getAll(): any {
    return this.jobService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.jobService.findOne(id);
  }

  @Put()
  updateStatus(@Body() jobUpdateStatusDto: JobUpdateStatusDto): any {
    return this.jobService.updateStatus(
      jobUpdateStatusDto.id,
      jobUpdateStatusDto.status,
    );
  }

  @Post()
  create(@Body() jobDto: JobDto): any {
    return this.jobService.create(jobDto);
  }

  @Get(':id/boards')
  getJobBoards(@Param('id') id: string): any {
    return this.jobService.getJobBoards(id);
  }
}
