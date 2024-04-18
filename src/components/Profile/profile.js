import {useEffect, useState} from "react";
import {getMyProfile, updateAvatar} from "../../js/profile-api";
import ProfileCustomer from "./customerProfile";
import ProfileVenueManager from "./venueManagerProfile";

const Profile = () => {

    const [isVenueManager, setIsVenueManager] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [newAvatarUrl, setNewAvatarUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)

    async function onClickUpdateAvatar () {
        const list = await updateAvatar(newAvatarUrl);
        if (list.length > 0) {
            setErrorMessage(list.join(", "))
        } else {
            setAvatarUrl(newAvatarUrl)
        }

    }
    useEffect(() => {


        async function fetchMyProfile() {
            const profile = await getMyProfile()
            setIsVenueManager(profile.venueManager)
            setAvatarUrl(profile.avatar.url)
        }
         fetchMyProfile();
     }, [])


    return (
            <div>
                <div id="profileAvatar">
                    {avatarUrl === "" ? <div></div> : <img src={avatarUrl}/>}
                    <input
                        type="text"
                        placeholder="Change avatar url"
                        value={newAvatarUrl}
                        onChange={event => setNewAvatarUrl(event.target.value)}/>
                    <button onClick={() => onClickUpdateAvatar()}>Update</button>
                    <div>{errorMessage ? errorMessage : <div/>}</div>
                </div>
                {isVenueManager === null ?
                    <div></div> :
                    <div>{isVenueManager === false ? <ProfileCustomer/> : <ProfileVenueManager/>}</div>
                }

            </div>
    )
}

export default Profile;