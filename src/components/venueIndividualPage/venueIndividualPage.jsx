import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Calendar from "react-calendar";
import "./customCalender.scss";
import "./venueIndividualPage.scss"
import {createBooking} from "../../js/booking-api";
import {getMyProfile} from "../../js/profile-api";
import {baseUrl} from "../common/constants";


/**
 * Adds specified number of days to a given date.
 * @param {Date} inputDate - The input date.
 * @param {number} days - The number of days to add.
 * @returns {Date} - The new date after adding the specified days.
 */
function addDays(inputDate, days) {
    let date = new Date(inputDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * Retrieves an array of dates between the given start and stop dates.
 * @param {Date} startDate - The start date.
 * @param {Date} stopDate - The stop date.
 * @returns {Date[]} - An array of dates between the start and stop dates.
 */
function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

/**
 * Resolves unselectable dates for a venue based on existing bookings and maximum guest count.
 * @param {Object[]} bookings - Array of bookings for the venue.
 * @param {number} maxGuestCountForVenue - Maximum guest count allowed for the venue.
 * @returns {Date[]} - Array of unselectable dates.
 */
export function resolveUnselectableDatesForVenue(bookings, maxGuestCountForVenue) {
    const bookedDatesWithGuestCount = bookings.map(booking => {
        const fromDate = new Date(booking.dateFrom);
        const toDate = new Date(booking.dateTo);
        const guestCount = booking.guests;
        const datesForBooking = getDates(fromDate, toDate);
        return datesForBooking.map(dateForBooking => {
            return {
                date: dateForBooking,
                guestCount: guestCount
            }
        })
    })
        .flat()
        .reduce((accumulator, currentValue) => {
            const key = currentValue.date.getTime();
            if (accumulator.has(key)) {
                const existingGuestCount = accumulator.get(key);
                const newGuestCount = existingGuestCount + currentValue.guestCount;
                accumulator.set(key, newGuestCount)
            } else {
                accumulator.set(key, currentValue.guestCount)
            }
            return accumulator;
        }, new Map());


    return Array.from(bookedDatesWithGuestCount.entries()).filter(entry => {
        const guestCount = entry[1];
        const exceedsGuestLimits = guestCount >= maxGuestCountForVenue
        return exceedsGuestLimits
    }).map(entry => new Date(entry[0]))
}

/**
 * IndividualVenue component renders information about a specific venue.
 * @returns {JSX.Element} - JSX element containing information about the venue.
 */
const IndividualVenue = () => {
    const [venue, setVenue] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [newBookingError, setNewBookingError] = useState(null)
    const [guestCount, setGuestCount] = useState(0)
    const [isVenueManager, setIsVenueManager] = useState(null)

    const navigate = useNavigate()
    let params = useParams();
    const venueId = params.id

    const storePickedDate = (value, event) => {
        setSelectedDates(value);
    }
    const onClickDay = (value, event) => {
        if (selectedDates.length === 2) {
            setSelectedDates([])
        }
    }


    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const response = await fetch(baseUrl + `/holidaze/venues/${venueId}?_bookings=true`);
                if (!response.ok) {
                    throw new Error('Failed to fetch venue');
                }
                const jsonResponse = await response.json();
                const responseVenue = jsonResponse.data;
                setVenue(responseVenue);
                setDisabledDates(
                    resolveUnselectableDatesForVenue(responseVenue.bookings, responseVenue.maxGuests)
                        .map(date => date.toDateString())
                );
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchVenue();
        getMyProfile()
            .then(myProfile => setIsVenueManager(myProfile.venueManager))
            .catch(error => setIsVenueManager(null));
    }, [venueId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }
    const customTileClass = ({date, view}) => {
        if (selectedDates.some((selectedDate) => date.toDateString() === selectedDate.toDateString())) {
            return 'selected-date';
        }
        if (
            selectedDates.length === 2 &&
            date > Math.min(...selectedDates) &&
            date < Math.max(...selectedDates)
        ) {
            return 'between-dates';
        } else {
            return 'white-bg'
        }
    };


    async function submitBooking() {
        const errors = await createBooking(selectedDates[0], selectedDates[1], guestCount, venueId);
        const errorMessage = errors.map(error => error.message).join(", ")
        setNewBookingError(errorMessage)
        if (errors.length === 0) {
            navigate("/profile");
        }
        console.log(errors);
    }

    return (
        <div className="container container-individualVenue">
            <div className="row">
                <div
                    className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center align-items-md-start justify-content-md-start mb-3 mt-md-3 text-break">
                    <h1>{venue.name}</h1>
                    <div>
                        <p>{venue.description}</p>
                        <p>Price: {venue.price}$</p>
                        <p>Rating: {venue.rating}</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center mb-3 mt-md-5">
                    <div className="mb-3 mt-md-3">
                        <img className="img-fluid object-fit-cover" src={venue.media[0].url} alt={venue.name}/>
                    </div>
                </div>
                <div
                    className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center align-items-md-start justify-content-md-start mb-3">
                        <b>Information:</b>
                        <div>
                            <p>Max guests: {venue.maxGuests}</p>
                            <p>Wifi: {venue.meta.wifi ? <span>Yes</span> : <span>No</span>}</p>
                            <p>Parking: {venue.meta.parking ? <span>Yes</span> : <span>No</span>}</p>
                            <p>Pets: {venue.meta.pets ? <span>Yes</span> : <span>No</span>}</p>
                        </div>
                    <div>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center mb-3 text-break">
                    <div>
                        <b>Location:</b>
                        <div>
                            <p>{venue.location.address}</p>
                            <p>{venue.location.zip} {venue.location.city}</p>
                            <p>{venue.location.country}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h5>Available dates:</h5>
                </div>
                <div className="col-12 mb-3">
                    <label>Number of Guests:</label>
                    <div className="col-2">
                        <input
                            type="number"
                            className="form-control rounded-0 shadow"
                            value={guestCount}
                            onChange={(event) => setGuestCount(parseInt(event.target.value))}
                            min={1}
                            max={venue.maxGuests}
                        />
                    </div>
                </div>
                <div className="error mb-2">{newBookingError ? <span>{newBookingError}</span> : <span></span>}</div>
                <div className="col-12 mb-3">
                    <Calendar
                        onChange={storePickedDate}
                        value={selectedDates}
                        onClickDay={onClickDay}
                        selectRange={true}
                        tileDisabled={({date}) => {
                            return disabledDates.includes(date.toDateString());
                        }}
                        minDate={new Date()}
                        tileClassName={customTileClass}
                        className="react-calendar bg-white"


                    />
                    {isVenueManager === false ? (
                        <div className="mx-auto text-center mb-5 btn-blue col-2 mt-2">
                            <button onClick={submitBooking} className="btn text-white fw-medium rounded-0 py-2">Book
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default IndividualVenue;

