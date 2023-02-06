import { FormWrapper } from "./formwrapper";
type TemplateFormProps = {
    template: number;
    updateTemplateFields: (data: number) => void;
}
export default function TemplateForm({ template, updateTemplateFields }: TemplateFormProps) {
    return (
        <FormWrapper title="Template">
            <div>
                <label htmlFor="template">Template:</label>
                <select id="template" name="template" value={template}
                    onChange={e => updateTemplateFields(parseInt(e.target.value))}>
                    <option value="1">Template 1</option>
                    <option value="2">Template 2</option>
                </select>
            </div>

        </FormWrapper>
    )
}