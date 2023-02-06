import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { type } from 'os';
import { JobBoardDto, JobBoardUpdateDto } from './job-board.model';
import JobBoardService from './job-board.service';

@Controller('/api/jobboard')
export default class JobBoardController {
  constructor(private readonly jobBoardService: JobBoardService) {}

  @Get()
  getAll(): any {
    return this.jobBoardService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.jobBoardService.findOne(id);
  }

  @Get(':id/jobs/')
  getJobs(@Param('id') id: string): any {
    return this.jobBoardService.getJobs(id);
  }

  @Put(':jobBoardId/addJob/:jobId')
  addJob(
    @Param('jobBoardId') jobBoardId: string,
    @Param('jobId') jobId: string,
  ): any {
    this.jobBoardService.addJob(jobBoardId, jobId);
  }

  @Put(':id/update')
  updateBoard(@Param('id') id: string, @Body() jobBoardDto: JobBoardDto) {
    return this.jobBoardService.update(id, jobBoardDto);
  }

  @Post()
  create(@Body() jobBoardDto: JobBoardDto): any {
    return this.jobBoardService.create(jobBoardDto);
  }
}
