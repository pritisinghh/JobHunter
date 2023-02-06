import { Body, Controller, Get, Header, Param, Post, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Resume } from 'src/resume/resume.model';
import ResumeService from 'src/resume/resume.service';
import { ResumeMaker } from './resume_maker.model';
import { ResumeMakerService } from './resume_maker.service';

@Controller('/api/resume-maker')
export class ResumeMakerController {
    constructor(private readonly resumeMakerService: ResumeMakerService, private resumeService: ResumeService) { }

    @Post()
    createLatexString(@Body() resumeMaker: ResumeMaker) {
        let latex = this.resumeMakerService.createLatexString(resumeMaker);
        let promiseobj = this.resumeService.create({
            "content": latex,
            "jsonTemplate": resumeMaker
        })
        let id = promiseobj.then((resume) => {
            return resume.id
        })
        return id;
    }

    @Get(':id')
    @Header('Content-Type', 'application/pdf')
    createPDF(@Param('id') id: string): StreamableFile {
        let query: Promise<Resume> = this.resumeService.findOne(id);
        let latexString = query.then((resume) => {
            return resume.content;
        })
        latexString.then((latex) => {
            this.resumeMakerService.createPDF(latex);
        })
        const PDF = createReadStream(join(process.cwd(), 'src/utils/resume_maker_util/files/resume.pdf'));
        return new StreamableFile(PDF);
    }

    @Get('/JSON/:id')
    getJSON(@Param('id') id: string) :object {
        let query: Promise<Resume> = this.resumeService.findOne(id);
        let resumePromise = query.then((resume) => {
            return resume;
        })
        let jsondata = resumePromise.then((resume) => {
            return resume.jsonTemplate;
        })
        
        return jsondata.then((json) => {
            return json;
        })
    }

    @Post('/update/:id')
    updateResume(@Param('id') id: string, @Body() resumeMaker: ResumeMaker) {
        let latex = this.resumeMakerService.createLatexString(resumeMaker);
        this.resumeService.updateContent(id, latex, resumeMaker);
        return 'ok';
        
    }



}
