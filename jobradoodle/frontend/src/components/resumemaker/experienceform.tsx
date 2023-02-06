import { Button, Paper } from "@mui/material";
import React from "react";
import { FormWrapper } from "./formwrapper";
import { Experience } from "./types";

type ExperienceFormProps = {
    experiencedata: Partial<Experience>[];
    updateExperienceFields: (data: Partial<Experience>, index: number) => void;
    addNewExperience: () => void;
    removeExperience: (index: number) => void;
}


export default function ExperienceForm(
    { experiencedata, updateExperienceFields, addNewExperience, removeExperience }: ExperienceFormProps) {

    function updateResponsibilities(data: string, responsibilityIndex: number, experienceIndex: number): string[] {
        let old = experiencedata[experienceIndex].responsibilities;
        let newResponsibilities = old || [''];
        newResponsibilities[responsibilityIndex] = data;
        return newResponsibilities || [''];


    }
    return (
        <FormWrapper title="Experience">
            {experiencedata.map((experience, index) => (
                <React.Fragment key={index}>

                    <div style={{
                        display: 'grid',
                        gap: 5
                    }}>
                        <Paper className="fields">
                            <div>
                                <label htmlFor="company">Company:  </label>
                                <input type="text" id="company" name="company" value={experience.company}
                                    onChange={e => updateExperienceFields({ company: e.target.value }, index)} />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    value={experience.position}
                                    onChange={(e) => {
                                        updateExperienceFields({ position: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="start">Start</label>
                                <input
                                    type="text"
                                    id="start"
                                    value={experience.start}
                                    onChange={(e) => {
                                        updateExperienceFields({ start: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="end">End</label>
                                <input
                                    type="text"
                                    id="end"
                                    value={experience.end}
                                    onChange={(e) => {
                                        updateExperienceFields({ end: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="responsibilities">Responsibilities</label>
                                <div>
                                    {experience.responsibilities?.map((responsibility, responsibilityIndex) => (
                                        <div key={responsibilityIndex}>
                                            <input
                                                type="text"
                                                id="responsibility"
                                                value={responsibility}
                                                onChange={(e) => {
                                                    updateExperienceFields({ responsibilities: updateResponsibilities(e.target.value, responsibilityIndex, index) }, index);
                                                }}
                                            />
                                            <Button onClick={() => {
                                                let old = experiencedata[index].responsibilities;
                                                let newResponsibilities = old || [''];
                                                newResponsibilities.splice(responsibilityIndex, 1);
                                                updateExperienceFields({ responsibilities: newResponsibilities }, index);
                                            }}>Remove</Button>
                                            
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <Button onClick={() => removeExperience(index)}>Remove</Button>
                    {/* <Button onClick={() => addNewExperience()}>Add</Button> */}
                </React.Fragment>
            ))}
         
        <Button onClick={addNewExperience}>Add Experiece</Button>
        </FormWrapper>
    );
}