import { Injectable } from "@nestjs/common";
import { Template1 } from "src/utils/resume_maker_util/Templates/Template 1/form-text";
import { ResumeMaker } from "./resume_maker.model";
import writeTexFile from "src/utils/resume_maker_util/text-latex";
import topdf from "src/utils/resume_maker_util/latex-pdf";
import { TemplateInterface } from "src/utils/resume_maker_util/templates_interface";
import { Template2 } from "src/utils/resume_maker_util/Templates/Template 2/form-text";
@Injectable()
export class ResumeMakerService {
    createLatexString(resumeMaker: ResumeMaker) {
        let template = resumeMaker.template;
        let profile =  resumeMaker.profile;
        let education = resumeMaker.education;
        let experience = resumeMaker.experience;
        let projects = resumeMaker.projects;
        let skills = resumeMaker.skills;
        let latexString = '';
        let templateobj : TemplateInterface;
        switch(template) {
            case 1:
                templateobj = new Template1(profile, education, experience, projects, skills);
                break;
            case 2:
                templateobj = new Template2(profile, education, experience, projects, skills);
            default:
                break;
        }
        latexString = templateobj.toLatex();
        return latexString;
    }

    createPDF(latexString: string) {
        writeTexFile(latexString);
        let compiler = latexString.split('\n')[0];
        compiler = compiler.substring(1);
        topdf(compiler);
        return "ok";
    }

}
