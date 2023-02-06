import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ResumeContentUpdateDto,
  ResumeDto,
  ResumeSetParentDto,
} from './resume.model';
import ResumeService from './resume.service';

@Controller('/api/resume')
export default class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  getAll(): any {
    return this.resumeService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.resumeService.findOne(id);
  }

  @Get(':id/children')
  getChildResumes(@Param('id') id: string): any {
    return this.resumeService.getChildResumes(id);
  }

  @Get()
  getByJobId(@Query('jobId') jobId: string): any {
    return this.resumeService.getByJobId(jobId);
  }

  @Post()
  create(@Body() resumeDto: ResumeDto): any {
    return this.resumeService.create(resumeDto);
  }

  @Put('updateContent')
  updateContent(@Body() resumeContentUpdateDto: ResumeContentUpdateDto): any {
    return this.resumeService.updateContent(
      resumeContentUpdateDto.id,
      resumeContentUpdateDto.content,
      resumeContentUpdateDto.jsonTemplate
    );
  }

  @Put('setParent')
  setParent(@Body() resumeSetParentDto: ResumeSetParentDto): any {
    return this.resumeService.setParent(
      resumeSetParentDto.resumeId,
      resumeSetParentDto.parentResumeId,
    );
  }
}
