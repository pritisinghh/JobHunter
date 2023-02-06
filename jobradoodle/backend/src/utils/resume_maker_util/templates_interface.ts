import { EducationDto, ExperienceDto, ProfileDto, ProjectsDto, SkillsDto } from "src/resume_maker/resume_maker.model";

export interface TemplateInterface {
    readonly compiler: string;
    parseProfile(profile: ProfileDto): string;
    parseEducation(education: EducationDto[]): string;
    parseExperience(experience: ExperienceDto[]): string;
    parseProjects(projects: ProjectsDto[]): string;
    parseSkills(skills: SkillsDto): string;
    toLatex(): string;
}