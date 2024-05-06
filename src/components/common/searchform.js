import React, {useEffect, useState} from 'react';
import './SearchForm.scss';
import {setErrorLoading, setLoadingState, setNewFilteredVenues} from "../redux/filteredVenueSlice";
import {useDispatch} from "react-redux";
import "./global.scss"

/**
 * SearchForm component for the Holidaze Booking application.
 * This component renders a search input field and button to search for venues.
 * @returns {JSX.Element} The rendered search form component.
 */
const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                dispatch(setLoadingState(true));
                const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');

                if (!response.ok) {
                    throw new Error('Failed to fetch venues');
                }
                const jsonResponse = await response.json();
                const venues = jsonResponse.data;
                console.log(venues);
                setVenues(venues);
                dispatch(setNewFilteredVenues(venues))
                setLoading(false);
                dispatch(setLoadingState(false));
            } catch (error) {
                setError(error.message);
                dispatch(setErrorLoading(error.message));
                setLoading(false);
            }

        };
        fetchVenues();
    }, []);

    /**
     * Function to handle the search action.
     * Filters the venues based on the search term and updates the filtered venues.
     */
    const handleSearch = () => {

        const filtered = venues
            .filter(venue => !searchTerm || JSON.stringify(venue).toLowerCase().includes(searchTerm.toLowerCase()));

        dispatch(setNewFilteredVenues(filtered))

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg mb-3 mb-md-0">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control text-dark custom-input shadow rounded-0"
                    />
                </div>
                <div className="col-auto btn-blue ms-2">
                    <button onClick={handleSearch} className=" text-white btn fw-medium rounded-0">Search</button>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
