import React, {useEffect, useState} from 'react';
import './SearchForm.scss';
import {setErrorLoading, setLoadingState, setNewFilteredVenues} from "../venue/filteredVenueSlice";
import {useDispatch} from "react-redux";


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

    const handleSearch = () => {

        const filtered = venues
            .filter(venue => !searchTerm || JSON.stringify(venue).toLowerCase().includes(searchTerm.toLowerCase()));

        dispatch(setNewFilteredVenues(filtered))

        //TODO, check if current route is homepage. If not, show dialog, before redirect to homepage.
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
                                className="form-control text-dark custom-input"
                            />
                        </div>
                        <div className="col-auto btn-blue rounded ms-2">
                            <button onClick={handleSearch} className=" text-white btn">Search</button>
                        </div>
            </div>
        </div>
    );
};

export default SearchForm;
