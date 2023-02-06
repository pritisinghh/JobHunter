import { Button } from "@mui/material";
import { FormWrapper } from "./formwrapper";
import { Skills } from "./types";

type SkillsFormProps = {
    skills: Partial<Skills>;
    updateSkillsFields: (data: Partial<Skills>) => void;
}

export default function SkillsForm(
    { skills, updateSkillsFields }: SkillsFormProps) {

    function updateName(data: string, nameIndex: number): string[] {
        let old = skills.name;
        let newNames = old || [''];
        newNames[nameIndex] = data;
        return newNames || [''];
    }



    return (
        <FormWrapper title="Skills">
            <div>
                <label htmlFor="languages">Skills:</label>
                {skills.name && skills.name.map((name, nameIndex) => (
                    <div id={`name${nameIndex}`} key={`name${nameIndex}`}>
                        <input type="text" id="name" name="name" value={name}
                            onChange={e => updateSkillsFields({ name: updateName(e.target.value, nameIndex) })} />
                        <Button onClick={() => updateSkillsFields({ name: skills.name ? skills.name.filter((name, i) => i !== nameIndex) : [''] })}>
                            Remove Skill
                        </Button>
                    </div>
                ))}
                <Button onClick={() => updateSkillsFields({ name: [...skills.name || [''], ''] })}>
                    Add Skill
                </Button>
            </div>
        </FormWrapper>
    )
}

    //             {/* <input type="text" id="languages" name="languages" value={skills.name ? skills.name[0] : ''}
    //                 onChange={e => updateSkillsFields({ name: updateName(e.target.value, 0) })} /> */}
    //         </div>
    //     </FormWrapper>

    // )
// }