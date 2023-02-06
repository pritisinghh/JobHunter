import { Paper } from "@mui/material";
import { FormWrapper } from "./formwrapper";
import { Profile } from "./types";
type ProfileFormProps = {
    profiledata: Profile;
    updateProfileFields: (data: Partial<Profile>) => void;
}

export default function ProfileForm(
    { profiledata, updateProfileFields }: ProfileFormProps
) {


    return (
        <>
            <FormWrapper title="Profile">
                <Paper className="fields">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={profiledata.firstName} onChange={e => updateProfileFields({ firstName: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={profiledata.lastName} onChange={e => updateProfileFields({ lastName: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={profiledata.email} onChange={e => updateProfileFields({ email: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={profiledata.phone} onChange={e => updateProfileFields({ phone: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" value={profiledata.location} onChange={e => updateProfileFields({ location: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="urls">URLs:</label>
                        {profiledata.urls && profiledata.urls.map((url, index) => (
                            <div id={`url${index}`} key={`url${index}`}>
                                <input type="text" id="urls" name="urls" value={url}
                                    onChange={e => updateProfileFields({ urls: profiledata.urls.map((url, i) => i === index ? e.target.value : url) })} />

                                <button onClick={() => updateProfileFields({ urls: profiledata.urls.filter((url, i) => i !== index) })}>
                                    Remove
                                </button>

                                <button onClick={() => updateProfileFields({ urls: [...profiledata.urls, ""] })}>
                                    Add
                                </button>
                            </div>

                        ))}
                    </div>
                </Paper>


            </FormWrapper>
        </>
    )
}