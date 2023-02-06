import { Module } from "@nestjs/common";
import { ResumeModule } from "src/resume/resume.module";
import { ResumeMakerController } from "./resume_maker.controller";
import { ResumeMakerService } from "./resume_maker.service";

@Module({
    controllers: [ResumeMakerController],
    providers: [ResumeMakerService],
    imports: [ResumeModule],

})
export class ResumeMakerModule {}