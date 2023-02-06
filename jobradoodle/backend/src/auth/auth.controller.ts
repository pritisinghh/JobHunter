import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import User, { UserDto, UserJoPrefebrencesDto } from 'src/auth/auth.model';
import AuthService from 'src/auth/auth.service';
import { GoogleAuthGuard } from './auth.google-guard';
import { MailHandler } from 'src/utils/mail-handler';
import { axiosInstance } from 'src/main';
import { Request } from 'express';
import JobBoardService from 'src/job_board/job-board.service';
import { JobAutoUpdateStatusDto } from 'src/job/job.model';

@Controller('/api/auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jobBoardService: JobBoardService,
  ) {}

  @Get('/ping')
  async pingMail() {
    const resp = await axiosInstance.get('/');
    return resp.data;
  }

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  login(): any {}

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async callback(@Req() request: Request): Promise<any> {
    return { id: (<User>request.user).id };
  }

  @Get()
  getAll(): any {
    return this.authService.findAll();
  }

  @Get(':id/:jobBoardId/mails')
  async getMailsById(
    @Param('id') id: string,
    @Param('jobBoardId') jobBoardId: string,
  ): Promise<any> {
    const user = await this.authService.findOne(id);
    const mails = await MailHandler.fetchMails(user);

    const resp = await axiosInstance.post('/processmails', {
      mails: mails,
      userId: id,
      emailId: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    });

    const emailStatusResults: JobAutoUpdateStatusDto[] = [];

    resp.data.forEach((result: JobAutoUpdateStatusDto) => {
      if (result.companyName && result.role) emailStatusResults.push(result);
    });

    console.log('email Results', emailStatusResults);

    try {
      await this.jobBoardService.updateJobStatusFromMailData(
        jobBoardId,
        emailStatusResults,
      );
      return { message: 'ok' };
    } catch (error) {
      return { error: error.toString() };
    }
  }

  @Get(':id/boards')
  async getJobBoards(@Param('id') id: string): Promise<any> {
    return this.authService.getJobBoards(id);
  }

  @Put(':id/addBoard/:jobBoardId')
  async addJobBoard(
    @Param('id') id: string,
    @Param('jobBoardId') jobBoadId: string,
  ): Promise<any> {
    return this.authService.addBoard(id, jobBoadId);
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.authService.findOne(id);
  }

  @Get('u/:username')
  getByEmailOrUsername(@Param('username') username: string): any {
    return this.authService.findByUsername(username);
  }

  @Post()
  create(@Body() userDto: UserDto): any {
    return this.authService.create(userDto);
  }

  @Post(':id/updatePreferences')
  updatePreferences(
    @Param('id') id: string,
    @Body() preferences: UserJoPrefebrencesDto,
  ): any {
    return this.authService.updatePreferences(id, preferences);
  }
}
