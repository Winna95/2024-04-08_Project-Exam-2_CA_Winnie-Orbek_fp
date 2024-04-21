import React, {useEffect, useState} from "react";
import './homepage.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Venues = () => {
    const filteredVenues = useSelector((state) => state.filteredVenues.value);
    const loading = useSelector((state) => state.filteredVenues.loading);
    const error = useSelector((state) => state.filteredVenues.errorLoading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h5 className="text-center fw-bold">All Venues:</h5>
            <div className="row">
                {filteredVenues.map(venue => (
                    <div className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex align-items-center justify-content-center mb-3 " key={venue.id}>
                        <Link className="text-decoration-none" to={{ pathname: `/venue/${venue.id}` }}>
                        <div>
                            {venue.media.length > 0 ? (
                                <img className="img-fluid img-card object-fit-cover" src={venue.media[0].url} alt={venue.name}/>
                            ) : <div/>}
                            <p className="text-left mt-2 text-black">{venue.name}</p>
                        </div>

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Venues;