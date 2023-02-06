import { Button, Paper } from "@mui/material";
import React from "react";
import { FormWrapper } from "./formwrapper";
import { Education } from "./types";
import './style.css';
type EducationFormProps = {
    educationdata: Partial<Education>[];
    updateEducationFields: (data: Partial<Education>, index: number) => void;
    addNewEducation: () => void;
    removeEducation: (index: number) => void;
}

export default function EducationForm(
    { educationdata, updateEducationFields, addNewEducation, removeEducation }: EducationFormProps) {

    return (
        <FormWrapper title="Education">
            {educationdata.map((education, index) => (
                <React.Fragment key={index}>

                    <div style={{
                        display: 'grid',
                        gap: 5
                    }}>
                        <Paper className="fields">
                            <div>
                                <label htmlFor="school">School:  </label>
                                <input type="text" id="school" name="school" value={education.school}
                                    onChange={e => updateEducationFields({ school: e.target.value }, index)} />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="degree">Degree</label>
                                <input
                                    type="text"
                                    id="degree"
                                    value={education.degree}
                                    onChange={(e) => {
                                        updateEducationFields({ degree: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="major">Major</label>
                                <input
                                    type="text"
                                    id="major"
                                    value={education.major}
                                    onChange={(e) => {
                                        updateEducationFields({ major: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="start">Start</label>
                                <input
                                    type="date"
                                    id="start"
                                    value={education.start}
                                    onChange={(e) => {
                                        updateEducationFields({ start: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="end">End</label>
                                <input
                                    type="date"
                                    id="end"
                                    value={education.end}
                                    onChange={(e) => {
                                        updateEducationFields({ end: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={education.location}
                                    onChange={(e) => {
                                        updateEducationFields({ location: e.target.value }, index);
                                    }}
                                />
                            </div>
                        {/* </Paper>
                        <Paper className="fields"> */}
                            <div>
                                <label htmlFor="gpa">GPA</label>
                                <input
                                    type="number"
                                    id="gpa"
                                    value={education.gpa}
                                    onChange={(e) => {
                                        updateEducationFields({ gpa: Number(e.target.value) }, index);
                                    }}
                                />
                            </div>
                        </Paper>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 15
                        }}>
                            <Button onClick={() => {
                                removeEducation(index);
                            }}>Delete</Button>
                            <Button onClick={() => {
                                addNewEducation()
                            }}>Add</Button>
                        </div>

                    </div>

                </React.Fragment>

            ))}


        </FormWrapper>
    );

}