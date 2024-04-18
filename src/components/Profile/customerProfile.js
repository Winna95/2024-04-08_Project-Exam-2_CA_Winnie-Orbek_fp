import {useEffect, useState} from "react";
import {getMyBookings, getMyProfile} from "../../js/profile-api";
import ProfileVenueManager from "./venueManagerProfile";

const ProfileCustomer = () => {
    const [myBookings, setMyBookings] = useState([])
    useEffect(() => {


        async function fetchMyBookings() {
            const bookings = await getMyBookings()
            setMyBookings(bookings)
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