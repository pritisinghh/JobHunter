export type ResumeMaker = {
    template: number;
    profile: Profile;
    education?: Education[];
    experience?: Experience[];
    projects?: Projects[];
    skills?: Skills;
}

export type Profile =  {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    urls: string[];
}

export type Education =  {
    school: string;
    degree: string;
    major: string;
    start: string;
    end: string;
    location: string;
    gpa: number;
}

export type Experience  ={
    company: string;
    position: string;
    start: string;
    end: string;
    location: string;
    responsibilities: string[];
}

export type Projects = {
    name: string;
    start: string;
    end: string;
    description: string;
    responsibilities: string[];
    tools: string[];
}

export interface Skills {
    name: string[];
}

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

// export type Subset<K> = {
//     [attr in keyof K]?: K[attr] extends object
//         ? Subset<K[attr]>
//         : K[attr] extends object | null
//         ? Subset<K[attr]> | null
//         : K[attr] extends object | null | undefined
//         ? Subset<K[attr]> | null | undefined
//         : K[attr];
// };

export type Subset<T> = {
    [P in keyof T]?: Subset<T[P]>;
};



