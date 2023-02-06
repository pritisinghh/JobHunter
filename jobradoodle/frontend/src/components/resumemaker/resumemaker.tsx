import { FormEvent, useState } from "react";
import ProfileForm from "./profileform";
import { useMultiStepForm } from "./usemultistepform";
import { Education, Experience, INITIAL_STATE, Profile, Projects, ResumeMaker, Skills } from "./types";
import EducationForm from "./educationform";
import ExperienceForm from "./experienceform";
import SkillsForm from "./skillsform";
import ProjectsForm from "./projectsform";
import TemplateForm from "./templateform";
import { INITIAL_STATE_EDUCATION, INITIAL_STATE_EXPERIENCE, INITIAL_STATE_PROJECTS } from "./constants";




function ResumeMakerView() {

  const [templatedata, setTemplate] = useState(1);
  function updateTemplateFields(data: number) {
    setTemplate(data);
  }

  const [profiledata, setProfiledata] = useState(INITIAL_STATE.profile);

  function updateProfileFields(data: Partial<Profile>) {
    setProfiledata((prev) => {
      return { ...prev, ...data };
    });
  }

  const [educationdata, setEducationdata] = useState(INITIAL_STATE_EDUCATION);
  function updateEducationFields(data: Partial<Education>, index: number) {
    setEducationdata((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, ...data };
        }
        return item;
      })
    );
  }
  function addNewEducation() {
    setEducationdata((prev) => {

      const newData = [...prev, ...INITIAL_STATE_EDUCATION];
      return newData;
    });
  }
  function removeEducation(index: number) {
    setEducationdata((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  }



  const [experiencedata, setExperiencedata] = useState(INITIAL_STATE_EXPERIENCE);
  function updateExperiencedata(data: Partial<Experience>, index: number) {
    setExperiencedata((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, ...data };
        }
        return item;
      })
    );
  }
  function addNewExperience() {
    setExperiencedata((prev) => {
      const newData = [...prev, ...INITIAL_STATE_EXPERIENCE];
      return newData;
    });
  }
  function removeExperience(index: number) {
    setExperiencedata((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  }

  const [projectsdata, setProjectsdata] = useState(INITIAL_STATE_PROJECTS);
  function updateProjectsdata(data: Partial<Projects>, index: number) {
    setProjectsdata((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, ...data };
        }
        return item;
      })
    );
  }
  function addNewProject() {
    setProjectsdata((prev) => {
      const newData = [...prev, ...INITIAL_STATE_PROJECTS];
      return newData;
    });
  }
  function removeProject(index: number) {
    setProjectsdata((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  }


  const [skilldata, setSkilldata] = useState({} as Partial<Skills>);
  function updateSkilldata(data: Partial<Skills>) {
    setSkilldata((prev) => {
      return { ...prev, ...data };
    });
  }

  const { steps, currentStep, step, isFirstStep, isLastStep, previous, next } = useMultiStepForm([
    <TemplateForm template={templatedata} updateTemplateFields={updateTemplateFields} />,
    <ProfileForm profiledata={profiledata} updateProfileFields={updateProfileFields} />,
    <EducationForm educationdata={educationdata}
      updateEducationFields={updateEducationFields} addNewEducation={addNewEducation} removeEducation={removeEducation} />,
    <ExperienceForm experiencedata={experiencedata} 
    updateExperienceFields={updateExperiencedata} addNewExperience={addNewExperience} removeExperience = {removeExperience} />,
    <ProjectsForm projects={projectsdata} updateProjectsFields={updateProjectsdata}
    addNewProject = {addNewProject} removeProject = {removeProject} />,
    <SkillsForm skills={skilldata} updateSkillsFields={updateSkilldata} />,

    //<ExperienceForm {...data} updateField = {updateFields}/>
  ]);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    }
    let resumedata: ResumeMaker = {
      template: templatedata,
      profile: profiledata,
      education: educationdata as Education[],
      experience: experiencedata as Experience[],
      projects: projectsdata as Projects[],
      skills: skilldata as Skills
    }
    console.log(resumedata);
  }

  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid black',
      padding: '2rem',
      margin: '1rem',
      borderRadius: '.5rem',
      fontFamily: 'Arial'
    }}>

      <form onSubmit={onSubmit}>
        <div
          style={{
            position: 'absolute',
            top: '.5rem',
            right: '.5rem',
          }}>
          {currentStep + 1} / {steps.length}
        </div>
        {step}
        <div style={{
          marginTop: '1rem',
          display: "flex",
          justifyContent: "flex-end",
          gap: '.5rem'
        }}>
          {!isFirstStep && <button type='button' onClick={previous}>Back</button>}
          <button type="submit">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>

    </div>
  );


}

export default ResumeMakerView;
