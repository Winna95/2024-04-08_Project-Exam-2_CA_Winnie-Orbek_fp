import Navigation from "./Navigation";
import '../../App.scss'
import Searchform from "./searchform";
import {Link, useLocation} from "react-router-dom";
import "./global.scss"

/**
 * Header component for the Holidaze Booking application.
 * This component renders the header section with navigation, title, and search form.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
    const location = useLocation();
    return (
        <header>

            <div className="dark-blue-bg pb-4 text-white">
                <Navigation/>
                <h3><Link to="/" className="mb-4 ms-4 nav-link text-white hover-links">Holidaze.com</Link></h3>
                <h1 className="text-center">EXPLORE AND DISCOVER NEW PLACES</h1>
                <h2 className="text-center">Find low prices on hotels, homes and much more...</h2>
                <div>
                    {location.pathname === "/" ? <Searchform/> : <div/>}

                </div>
            </div>


        </header>
    );
};

export default Header;