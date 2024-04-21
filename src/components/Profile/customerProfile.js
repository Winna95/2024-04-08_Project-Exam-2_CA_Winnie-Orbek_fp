import {useEffect, useState} from "react";
import {getMyBookings, getMyProfile} from "../../js/profile-api";
import ProfileVenueManager from "./venueManagerProfile";
import {useNavigate} from "react-router-dom";

const ProfileCustomer = () => {
    const [myBookings, setMyBookings] = useState([])

    const navigate = useNavigate()
    useEffect(() => {


        async function fetchMyBookings() {
            try {
                const bookings = await getMyBookings()
                setMyBookings(bookings)
            } catch (e) {
                navigate("/signin")
            }
        }
        fetchMyBookings();
    }, [])


    return (
        <div>
            {myBookings.map( booking => {
                return (
                    <div key={booking.id}>
                        <img src={booking.venue.media[0].url}/>
                        <p>{booking.venue.name}</p>
                        <p>From: {new Date (booking.dateFrom).toDateString()}</p>
                        <p>To: {new Date (booking.dateTo).toDateString()}</p>
                        <p>Number of guests: {booking.guests}</p>
                    </div>
                )
            }
            )}

        </div>
    )
}
export default ProfileCustomer;