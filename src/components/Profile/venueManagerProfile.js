import Venue from "./venue";
import {useEffect, useState} from "react";
import {getMyBookings, getMyVenues} from "../../js/profile-api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {deleteVenue} from "../../js/venue-api";
import {useNavigate} from "react-router-dom";
import "./venueManagerProfile.scss"
import "../common/global.scss"



const ProfileVenueManager = () => {
    const [showCreateVenueForm, setShowCreateVenueForm] = useState(false)
    const [editVenue, setEditVenue] = useState(null)
    const [myVenues, setMyVenues] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [bookingsToShow, setBookingsToShow] = useState([])
    const [noBookingExists, setNoBookingExists] = useState(false)


    const navigate = useNavigate()

    async function onClickDelete(venueId) {
        const list = await deleteVenue(venueId)
        if (list.length > 0) {
            setErrorMessage(list.join(", "))
        } else {
            window.location.reload()
        }
    }

    function onClickShowBooking(venue) {

        const venuesCopy = JSON.parse(JSON.stringify(myVenues))
        venuesCopy.forEach(myVenue => {
            if(myVenue.id !== venue.id) {
                if(myVenue.showBookingBtnClicked) {
                    myVenue.showBookingBtnClicked = false
                }
            }
        })
        const foundVenue = venuesCopy.find(v => v.id === venue.id);
        foundVenue.showBookingBtnClicked = !foundVenue.showBookingBtnClicked
        if(foundVenue.showBookingBtnClicked) {
            setBookingsToShow(foundVenue.bookings)
        } else {
            setBookingsToShow([]);
        }

        if (venue.bookings.length < 1 && foundVenue.showBookingBtnClicked) {
            setNoBookingExists(true)
        } else {
            setNoBookingExists(false)
            document.getElementById("bookings")?.scrollIntoView()
        }
        setMyVenues(venuesCopy)
    }

    function editOnClick (){
        document.getElementById("venueForm")?.scrollIntoView()
    }

    useEffect(() => {

        async function fetchMyVenues() {
            try {
                const venues = await getMyVenues()
                console.log(venues)
                venues.forEach( venue => {
                    venue.showBookingBtnClicked = false
                })
                setMyVenues(venues)
            } catch (e) {
                navigate("/")
            }
        }
        fetchMyVenues();
    }, [])
return (
    <div className="container">
        <h3 className="text-center mb-5">My venues:</h3>
        <div className="row justify-content-center">
            {myVenues.map(venue => {
                return (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={venue.id}>
                        <div className="card h-100 mx-auto d-flex flex-column shadow">
                            <div className="d-flex mb-2">
                                <button className="btn btn-outline-dark border-0 bg-transparent align-self-start"
                                        onClick={() => {
                                            setEditVenue(venue);
                                            editOnClick();
                                        }}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <div className="error">{errorMessage ? errorMessage : <div/>}</div>
                                <button className="btn btn-outline-dark border-0 bg-transparent align-self-start" onClick={() => onClickDelete(venue.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                            <img className="card-img-top object-fit-cover" src={venue.media[0].url} alt={venue.name}/>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="px-2 mx-auto">
                                    <h5 className="card-title text-center">{venue.name}</h5>
                                    <p className="card-text">{venue.description}</p>
                                    <p className="card-text">Price: {venue.price}$</p>
                                </div>
                                <div className="text-center my-4">
                                    <button className="btn-blue border-0 text-white px-5 py-2 rounded-0 fw-medium" onClick={() => {onClickShowBooking(venue)}}>
                                        {venue.showBookingBtnClicked ? 'Close bookings' : ' Show bookings'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
        <div id="bookings" className="row justify-content-center">
            {noBookingExists ? <div>No bookings</div> : <div/>}
            {bookingsToShow.map(booking => {
                return (
                    <div className="card" key={booking.id}>
                        <div className="card-body">
                        <p className="card-text">{new Date (booking.dateFrom).toDateString()} - {new Date (booking.dateTo).toDateString()}</p>
                        <p className="card-text">{booking.guests} guests</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="text-center mt-4">
            <h3>Create new venue:</h3>
            <div className="btn my-2">
                <button className="btn-blue border-0 text-white px-5 py-2 rounded-0 fw-medium" onClick={() => setShowCreateVenueForm(true)}>Create new venue</button>
            </div>
        </div>
        {showCreateVenueForm ? <Venue  createMode={true} /> : null}
        <div id="venueForm">{editVenue !== null ? <Venue createMode={false} venue={editVenue} /> : null}</div>
    </div>

)
}
export default ProfileVenueManager;