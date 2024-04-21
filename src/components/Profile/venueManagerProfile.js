import Venue from "./venue";
import {useEffect, useState} from "react";
import {getMyBookings, getMyVenues} from "../../js/profile-api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {deleteVenue} from "../../js/venue-api";
import {useNavigate} from "react-router-dom";



const ProfileVenueManager = () => {
    const [showCreateVenueForm, setShowCreateVenueForm] = useState(false)
    const [editVenue, setEditVenue] = useState(null)
    const [myVenues, setMyVenues] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()
    async function onClickDelete(venueId) {
        const list = await deleteVenue(venueId)
        if (list.length > 0) {
            setErrorMessage(list.join(", "))
        } else {
            window.location.reload()
        }
    }

    useEffect(() => {

        async function fetchMyVenues() {
            try {
                const venues = await getMyVenues()
                setMyVenues(venues)
            } catch (e) {
                navigate("/")
            }
        }
        fetchMyVenues();
    }, [])
return (
    <div>
        <div>
            {myVenues.map(venue => {
                return (
                    <div key={venue.id}>
                        <button onClick={() => setEditVenue(venue)}><FontAwesomeIcon icon={faPen} /></button>
                        <div>{errorMessage ? errorMessage : <div/>}</div>
                        <button onClick={() => onClickDelete(venue.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        <img src={venue.media[0].url}/>
                        <p>{venue.name}</p>
                        <p>{venue.description}</p>
                        <p>{venue.price}</p>
                    </div>
                )

            })}
        </div>
        <button onClick={() => setShowCreateVenueForm(true)}>Create Venue</button>
        {showCreateVenueForm ? <Venue createMode={true} /> : <div/>}
        {editVenue !== null ? <Venue createMode={false} venue={editVenue} /> : <div/>}

    </div>
)
}
export default ProfileVenueManager;