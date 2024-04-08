import {useEffect, useState} from "react";
import './homepage.scss'

const Venues = () => {
    const [venues, setVenues] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await  fetch ('https://v2.api.noroff.dev/holidaze/venues');

                if(!response.ok) {
                    throw new Error('Failed to fetch venues');
                }
                const jsonResponse = await response.json();
                setVenues(jsonResponse.data);
                setLoading(false);
                console.log(jsonResponse)
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }

        };
        fetchVenues();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center">All Venues:</h1>
            <div className="row">
                {venues.map(venue => (
                    <div className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex align-items-center justify-content-center mb-3 " key={venue.id}>
                        <div>
                            {venue.media.length > 0 ? (
                                <img className="img-fluid img-card object-fit-cover" src={venue.media[0].url} alt={venue.name}/>
                            ) : <div/>}
                            <p className="text-left mt-2">{venue.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    )
};

export default Venues;