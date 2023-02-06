import { Button, Paper } from "@mui/material";
import React from "react";
import { FormWrapper } from "./formwrapper";
import { Projects } from "./types";

type ProjectsFormProps = {
    projects: Partial<Projects>[];
    updateProjectsFields: (data: Partial<Projects>, index: number) => void;
    addNewProject: () => void;
    removeProject: (index: number) => void;
}

export default function ProjectsForm(
    { projects, updateProjectsFields, addNewProject, removeProject }: ProjectsFormProps) {

    function updateResponsibilities(data: string, responsibilityIndex: number, projectIndex: number): string[] {
        let old = projects[projectIndex].responsibilities;
        let newResponsibilities = old || [''];
        newResponsibilities[responsibilityIndex] = data;
        return newResponsibilities || [''];

    }

    function updateTools(data: string, toolIndex: number, projectIndex: number): string[] {
        let old = projects[projectIndex].tools;
        let newTools = old || [''];
        newTools[toolIndex] = data;
        return newTools || [''];
    }


    return(
        <FormWrapper title="Projects">
            {projects.map((project, index) => (
                <React.Fragment key={index}>
                    <div style={{
                        display: 'grid',
                        gap: 5
                    }}>
                        <Paper className="fields">
                            <div>
                                <label htmlFor="title">Title:  </label>
                                <input type="text" id="title" name="title" value={project.name}
                                    onChange={e => updateProjectsFields({ name: e.target.value }, index)} />
                            </div> 
                            <div>
                                <label htmlFor="description">Description:  </label>
                                <input type="text" id="description" name="description" value={project.description}
                                    onChange={e => updateProjectsFields({ description: e.target.value }, index)} />
                            </div>
                            <div>
                                <label htmlFor="responsibilities">Responsibilities:  </label>
                                {project.responsibilities && project.responsibilities.map((responsibility, responsibilityIndex) => (
                                    <div id={`responsibility${responsibilityIndex}`} key={`responsibility${responsibilityIndex}`}>
                                        <input type="text" id="responsibilities" name="responsibilities" value={responsibility}
                                            onChange={e => updateProjectsFields({ responsibilities: updateResponsibilities(e.target.value, responsibilityIndex, index) }, index)} />
                                        <Button onClick={() => updateProjectsFields({ responsibilities: project.responsibilities? project.responsibilities.filter((responsibility, i) => i !== responsibilityIndex) : ['']}, index)}>
                                            Remove Responsibility
                                        </Button>
                                    </div>
                                ))}
                                <Button onClick={() => updateProjectsFields({ responsibilities: [...project.responsibilities || [''], ''] }, index)}>
                                    Add Responsibility
                                </Button>
                            </div>
                            <div>
                                <label htmlFor="tools">Tools:  </label>
                                {project.tools && project.tools.map((tool, toolIndex) => (
                                    <div id={`tool${toolIndex}`} key={`tool${toolIndex}`}>
                                        <input type="text" id="tools" name="tools" value={tool}
                                            onChange={e => updateProjectsFields({ tools: updateTools(e.target.value, toolIndex, index) }, index)} />
                                        <Button onClick={() => updateProjectsFields({ tools: project.tools? project.tools.filter((tool, i) => i !== toolIndex) : [''] }, index)}>
                                            Remove Tool
                                        </Button>
                                    </div>
                                ))}
                                <Button onClick={() => updateProjectsFields({ tools: [...project.tools || [''], ''] }, index)}>
                                    Add Tool
                                </Button>
                            </div>
                            
                            <div>
                                <label htmlFor="startDate">Start Date:  </label>
                                <input type="date" id="startDate" name="startDate" value={project.start}
                                    onChange={e => updateProjectsFields({ start: e.target.value }, index)} />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date:  </label>
                                <input type="date" id="endDate" name="endDate" value={project.end}
                                    onChange={e => updateProjectsFields({ end: e.target.value }, index)} />
                            </div>
                            
                        </Paper>
                        <Button onClick={() => removeProject(index)}>
                            Remove Project
                        </Button>
                    </div>
                </React.Fragment>
            ))}
            <Button onClick={addNewProject}>
                Add Project
            </Button>
        </FormWrapper>
    )


    // return (
    //     <>
    //         <FormWrapper title="Projects">
    //             <div>
    //                 <label htmlFor="name">Name: </label>
    //                 <input type="text" id="name" name="name" value={projects[0].name}
    //                     onChange={e => updateProjectsFields({ name: e.target.value }, 0)} />
    //             </div>

    //             <div>
    //                 <label htmlFor="start">Start Date: </label>
    //                 <input type="date" id="start" name="start" value={projects[0].start}
    //                     onChange={e => updateProjectsFields({ start: e.target.value }, 0)} />
    //             </div>

    //             <div>
    //                 <label htmlFor="end">End Date: </label>
    //                 <input type="date" id="end" name="end" value={projects[0].end}
    //                     onChange={e => updateProjectsFields({ end: e.target.value }, 0)} />
    //             </div>

    //             <div>
    //                 <label htmlFor="description">Description: </label>
    //                 <input type="text" id="description" name="description" value={projects[0].description}
    //                     onChange={e => updateProjectsFields({ description: e.target.value }, 0)} />
    //             </div>

    //             <div>
    //                 <label htmlFor="responsibilities">Responsibilities: </label>
    //                 <input type="text" id="responsibilities" name="responsibilities" value={projects[0].responsibilities ? projects[0].responsibilities[0] : ''}
    //                     onChange={e => updateProjectsFields({ responsibilities: updateResponsibilities(e.target.value, 0, 0) }, 0)} />
    //             </div>

    //             <div>
    //                 <label htmlFor="tools">Tools: </label>
    //                 <input type="text" id="tools" name="tools" value={projects[0].tools ? projects[0].tools[0] : ''}
    //                     onChange={e => updateProjectsFields({ tools: updateTools(e.target.value, 0, 0) }, 0)} />
    //             </div>

    //         </FormWrapper>
    //     </>
    // )
}