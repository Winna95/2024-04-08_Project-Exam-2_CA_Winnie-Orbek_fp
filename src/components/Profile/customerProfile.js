import React, {useEffect, useState} from "react";
import {getMyBookings} from "../../js/profile-api";
import {useNavigate} from "react-router-dom";
import "../common/global.scss";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {deleteBooking} from "../../js/booking-api";

/**
 * ProfileCustomer component for the Holidaze Booking application.
 * This component renders the profile page for customers, displaying their bookings and allowing them to delete bookings.
 * @returns {JSX.Element} The rendered profile component for customers.
 */
const ProfileCustomer = () => {
    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchMyBookings() {
            try {
                const bookings = await getMyBookings()
                setMyBookings(bookings)
                setLoading(false)
            } catch (e) {
                setError(e.message);
                setLoading(false);
                navigate("/signin");
            }
        }

        fetchMyBookings();
    }, []);

    /**
     * Function to handle the deletion of a booking.
     * Deletes the booking with the specified ID and updates the list of bookings.
     * @param {string} bookingId - The ID of the booking to be deleted.
     */
    async function onClickDelete(bookingId) {
        const list = await deleteBooking(bookingId)
        if (list.length > 0) {
            setErrorMessage(list.join(", "))
        } else {
            window.location.reload()
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="row">

                <h1 className="my-3 text-center">My bookings:</h1>
                {myBookings.map(booking => {
                        return (
                            <div key={booking.id}
                                 className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex align-items-center justify-content-center mb-3">
                                <div className="text-left card shadow">
                                    <button className="btn btn-outline-dark border-0 bg-transparent align-self-start"
                                            onClick={() => onClickDelete(booking.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                        <div className="error">{errorMessage ? errorMessage : <div/>}</div>
                                    </button>
                                    <img className="card-img-top object-fit-cover" src={booking.venue.media[0].url}/>
                                    <div className="card-body mx-auto">
                                        <h5 className="card-title text-center">{booking.venue.name}</h5>
                                        <p className="card-title">From: {new Date(booking.dateFrom).toDateString()}</p>
                                        <p className="card-text">To: {new Date(booking.dateTo).toDateString()}</p>
                                        <p className="card-text">Number of guests: {booking.guests}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}

            </div>
        </div>
    )
}
export default ProfileCustomer;