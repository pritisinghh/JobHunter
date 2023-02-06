import { EducationDto, ExperienceDto, ProfileDto, ProjectsDto, SkillsDto } from "src/resume_maker/resume_maker.model";
import {NEWLINE, template2BroilerPlate} from "../../constants";
import { TemplateInterface } from "../../templates_interface";

// INFO 
// complier - pdflatex
export class Template2 implements TemplateInterface {
    readonly compiler: string = 'pdflatex';

    constructor(public profile: ProfileDto, public education: EducationDto[], public experience: ExperienceDto[], public projects: ProjectsDto[], public skills: SkillsDto){
    }

    parseProfile(profile: ProfileDto): string {
        let profileString = `\\begin{tabular*}{7in}{l@{\\extracolsep{\\fill}}r}
        \\textbf{\\Large ${profile.firstName} ${profile.lastName} } & \\textit{${profile.email} | ${profile.phone} | ${profile.location}}
        \\end{tabular*}`;
        return profileString;
    }

    parseEducation(education: EducationDto[]): string {
        let educationString = `\\resheading{Education}
        \\begin{itemize}[leftmargin=*]`;
        education.forEach((education) => {
            educationString += `\\item[]
            \\school
            {${education.school}}
            {${education.location}\\\\}
            {${education.degree} ${education.major} ${education.gpa}}
            {${education.start} | ${education.end}}
            \\item[]`;
        }
        );
        educationString += `\\end{itemize}`;
        return educationString;
    }

    parseExperience(experience: ExperienceDto[]): string {
        let experienceString = `\\resheading{Work Experience}
        \\begin{itemize}[leftmargin=*]`;
        experience.forEach((experience) => {
            experienceString += `\\item[]
            \\job
            {${experience.company}}
            {${experience.location}}
            {${experience.position}}
            {${experience.start} | ${experience.end}}
            \\begin{itemize}`;
            experience.responsibilities.forEach((responsibility) => {
                experienceString += `\\item ${responsibility}`;
            });
            experienceString += `\\end{itemize}`;
        }
        );
        experienceString += `\\end{itemize}\n`;
        return experienceString;
    }

    parseProjects(projects: ProjectsDto[]): string {
        let projectsString = `\\resheading{Projects}\n
        \\begin{itemize}[leftmargin=*]\n`;
        projects.forEach((project) => {
            projectsString += `\\item[]
            \\project
            {${project.name}}\n
            {${project.tools.join(', ')}}
            {}
            {\\\\${project.description}}`;
        }
        );
        projectsString += `\\end{itemize}\n`;
        return projectsString;
    }

    parseSkills(skills: SkillsDto): string {
        let skillsString = `\\resheading{Skills}\n
        \\begin{itemize}[leftmargin=*]\n
        \\setlength\\itemsep{0em}\n`;
        skills.name.forEach((skill) => {
            skillsString += `\\item[] ${skill}\n`;
        });
        skillsString += `\\end{itemize}\n`;
        return skillsString;
    }

    toLatex(): string{

        let latexString = template2BroilerPlate;
        latexString += this.parseProfile(this.profile);
        latexString += this.parseEducation(this.education);
        latexString += this.parseExperience(this.experience);
        latexString += this.parseSkills(this.skills);
        latexString += this.parseProjects(this.projects);
        latexString += '\\end{document}';
        return latexString;

    }
}