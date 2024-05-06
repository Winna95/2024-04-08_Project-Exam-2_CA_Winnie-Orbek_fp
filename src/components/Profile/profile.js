import {useEffect, useState} from "react";
import {getMyProfile, updateAvatar} from "../../js/profile-api";
import ProfileCustomer from "./customerProfile";
import ProfileVenueManager from "./venueManagerProfile";
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const [isVenueManager, setIsVenueManager] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [newAvatarUrl, setNewAvatarUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()
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
            try {
                const profile = await getMyProfile()
                setIsVenueManager(profile.venueManager)
                setAvatarUrl(profile.avatar.url)
            } catch (e) {
                navigate("/signin")
            }
        }
         fetchMyProfile();
     }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center my-3">
                    <div id="profileAvatar">
                        {avatarUrl === "" ? <div></div> : <img className="img-fluid object-fit-cover rounded-circle" src={avatarUrl}/>}
                    </div>
                </div>
                <div className="my-3 col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex align-items-center"> {/* Wrapper for input and button */}
                        <input
                            className="border-0 px-4 px-lg-5 py-2 rounded-0 shadow"
                            type="text"
                            placeholder="Change avatar url"
                            value={newAvatarUrl}
                            onChange={event => setNewAvatarUrl(event.target.value)}
                        />
                        <button className="btn-blue border-0 text-white px-4 px-lg-5 py-2 ms-2 rounded-0 fw-medium" onClick={() => onClickUpdateAvatar()}>Update</button>
                    </div>
                    {/* Error message placed under input and button */}
                    <div className="error text-center">{errorMessage ? errorMessage : <div/>}</div>
                </div>
            </div>

            {isVenueManager === null ?
                <div></div> :
                <div>{isVenueManager === false ? <ProfileCustomer/> : <ProfileVenueManager/>}</div>
            }
        </div>

    )
}

export default Profile;