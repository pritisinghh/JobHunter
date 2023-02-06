import { EducationDto, ExperienceDto, ProfileDto, ProjectsDto, SkillsDto } from "src/resume_maker/resume_maker.model";
import {NEWLINE} from "../../constants";
import { TemplateInterface } from "../../templates_interface";

// INFO 
// complier - xelatex
export class Template1 implements TemplateInterface {
    readonly compiler: string = 'xelatex';
    constructor(public profile: ProfileDto, public education: EducationDto[], public experience: ExperienceDto[], public projects: ProjectsDto[], public skills: SkillsDto){
    }

    parseProfile(profile : ProfileDto):string{
        let personalInfo = '\\begin{center}'
	    +'\\headerfirstnamestyle{' +  profile.firstName + '} \\headerlastnamestyle{' + profile.lastName  + '}' + NEWLINE
	    + ' \\vspace{2mm}'
	    + '{\\faEnvelope\\ ' + profile.email + '} | {'
        + '\\faMobile\\ ' + profile.phone + '} | {'
        + '\\faMapMarker\\ ' + profile.location + '}\n' ;

        if(profile.urls.length > 0){
            personalInfo += NEWLINE;
            for(let i = 0; i < profile.urls.length; i++){
                personalInfo += '{\\faGlobe\\ ' + profile.urls[i] + '}\n'
            }
            personalInfo += '\\end{center}\n';
        }
        return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n
        %     Profile\n
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n` + personalInfo;
    }

    parseEducation(education: EducationDto[]):string{
        let educationInfo = '\\cvsection{Education}\n'
        + '\\begin{cventries}\n';
        for(let i = 0; i < education.length; i++){
            educationInfo += '\\cventry ' 
            + "{" +education[i].degree + ' in ' + education[i].major + '}'
            + '{' + education[i].school + '}'
            + '{' + education[i].location + '}'
            + '{' + education[i].start + ' -- ' + education[i].end + '}'
            + '{GPA: ' + education[i].gpa + '}'    
        }
        educationInfo += '\n'
        + "\\end{cventries}\n";
        + "\\vspace{-2mm}\n";
        return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n
        %     Education\n
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n` + educationInfo;
    }

    parseExperience(experience: ExperienceDto[]):string{
        let experienceInfo = '\\cvsection{Experience}\n'
        + '\\begin{cventries}\n';
        for(let i = 0; i < experience.length; i++){
            experienceInfo += '\\cventry '
            + '{' + experience[i].position + '}'
            + '{' + experience[i].company + '}'
            + '{' + experience[i].location + '}'
            + '{' + experience[i].start + ' -- ' + experience[i].end + '}'
            + '{\\begin{cvitems}\n';
            for(let j = 0; j < experience[i].responsibilities.length; j++){
                experienceInfo += '\\item '
                + '{' + experience[i].responsibilities[j] + '}'
            }
            experienceInfo += '\\end{cvitems}\n'
            + '}\n';
        }
        experienceInfo += '\\end{cventries}\n';
        return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n
        %     Experience\n
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n` + experienceInfo;
    }

    parseProjects(projects: ProjectsDto[]):string{
        let projectInfo = '\\cvsection{Projects}\n'
        + '\\begin{cventries}\n';
        for(let i = 0; i < projects.length; i++){
            projectInfo += '\\cventry '
            + '{' + projects[i].description + '}'
            + '{' + projects[i].name + '}'
            + '{';
            for(let j = 0; j < projects[i].tools.length; j++){
                projectInfo += projects[i].tools[j] + ', ';
            }
            projectInfo += '}\n{}'
            + '{\\begin{cvitems}\n';
            for(let j = 0; j < projects[i].responsibilities.length; j++){
                projectInfo += '\\item '
                + '{' + projects[i].responsibilities[j] + '}'
            }
            projectInfo += '\\end{cvitems}\n'
            + '}\n';
        }
        projectInfo += '\\end{cventries}\n';
        return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n
        %     Projects\n
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n` + projectInfo;
    }

    parseSkills(skills: SkillsDto):string{
        let skillInfo = '\\cvsection{Skills}\n'
        + '\\begin{cvitems}\n'
        for(let i = 0; i < skills.name.length; i++){
            skillInfo += '\\item {' + skills.name[i] + '}\n';
        }
        skillInfo += '\\end{cvitems}\n';
        return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n
        %     Skills\n
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n` + skillInfo;

    }      
    
    toLatex():string{

        let latex = '%'+ this.compiler +'\n'
        + '%!TEX encoding = UTF-8 Unicod\n'
        + '% Awesome CV LaTeX Template\n'
        + '\\documentclass[]{awesome-cv}\n'
        + '\\usepackage{textcomp}\n'
        + '\\fontdir[fonts/]\n'
        + '\\newcommand*{\\sectiondir}{resume/}\n'
        + '\\colorlet{awesome}{awesome-red}\n'
        +'\\begin{document}\n';
    
        latex += this.parseProfile(this.profile);
        latex += this.parseEducation(this.education);
        latex += this.parseSkills(this.skills);
        latex += this.parseExperience(this.experience);
        latex += this.parseProjects(this.projects);
        latex += '\\end{document}\n';

        return latex;
    }



}