import React from "react";
import '../common/global.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

/**
 * Venues component for the Holidaze Booking application.
 * This component renders a list of venues based on the filteredVenues state.
 * @returns {JSX.Element} The rendered venues component.
 */
const Venues = () => {
    const filteredVenues = useSelector((state) => state.filteredVenues.value);
    const loading = useSelector((state) => state.filteredVenues.loading);
    const error = useSelector((state) => state.filteredVenues.errorLoading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h5 className="text-center fw-bold">All Venues:</h5>
            <div className="row">
                {filteredVenues.map(venue => (
                    <div
                        className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex align-items-center justify-content-center mb-3 "
                        key={venue.id}>
                        <div className="card h-100 mx-auto d-flex flex-column shadow rounded-0">
                            <Link className="text-decoration-none hover-transform"
                                  to={{pathname: `/venue/${venue.id}`}}>
                                <div>
                                    {venue.media.length > 0 ? (
                                        <img className="card-img-top object-fit-cover rounded-0"
                                             src={venue.media[0].url} alt={venue.name}/>
                                    ) : <div/>}
                                    <div className="card-body d-flex flex-column">
                                        <p className="text-center text-black card-title">{venue.name}</p>
                                    </div>
                                </div>

                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Venues;