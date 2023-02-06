import { Education, Experience, Projects, ResumeMaker } from "./types";

export const INITIAL_STATE_EDUCATION: Partial<Education>[] = [
    {
      school: '',
      degree: '',
      major: '',
      start: '2022-11-19',
      end: '2022-11-19',
      location: '',
      gpa: 0,
    }];
  
  export const INITIAL_STATE_EXPERIENCE: Partial<Experience>[] = [
    {
      company: '',
      position: '',
      start: '2022-11-19',
      end: '2022-11-19',
      location: '',
      responsibilities: [''],
    }
  ];
  
  export const INITIAL_STATE_PROJECTS: Partial<Projects>[] = [
    {
      name: '',
      description: '',
      start: '2022-11-19',
      end: '2022-11-19',
      responsibilities: [''],
      tools: ['']
    }
  ];


  export const INITIAL_STATE: ResumeMaker = {
    template: 1,
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      urls: ['']
    },
    education: [
      {
        school: '',
        degree: '',
        major: '',
        start: '',
        end: '',
        location: '',
        gpa: 0
      }
    ],
    experience: [
      {
        company: '',
        position: '',
        start: '',
        end: '',
        location: '',
        responsibilities: ['']
      }
    ],
    projects: [
      {
        name: '',
        start: '',
        end: '',
        description: '',
        responsibilities: [''],
        tools: ['']
      }
    ],
    skills: {
      name: ['']
    },
  }
  