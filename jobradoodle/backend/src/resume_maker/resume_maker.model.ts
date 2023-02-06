export class ResumeMaker{
    template:number;
    profile: ProfileDto;
    education?: EducationDto[];
    experience?: ExperienceDto[];
    projects?: ProjectsDto[];
    skills?: SkillsDto;
}

export class ProfileDto{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    urls?: string[];
}

export class EducationDto{
    school: string;
    degree: string;
    major: string;
    start: string;
    end: string;
    location: string;
    gpa: number;
}

export class ExperienceDto{
    company: string;
    position: string;
    start: string;
    end: string;
    location: string;
    responsibilities: string[];
}

export class ProjectsDto{
    name: string;
    start: string;
    end: string;
    description: string;
    responsibilities: string[];
    tools: string[];
}

export class SkillsDto{
    name: string[];
}