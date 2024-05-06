import {Link} from "react-router-dom";

/**
 * Navigation component for non-authenticated users in the Holidaze Booking application.
 * This component renders the navigation links for non-authenticated users, including Home, Register, and Sign in.
 * @returns {JSX.Element} The rendered navigation component for non-authenticated users.
 */
const NavigationNotLoggedIn = () => {
    return (

        <ul className="navbar-nav">
            <li className="nav-item hover-links"><Link to="/" className="nav-link text-white">Home</Link></li>
            <li className="nav-item hover-links"><Link to="/register" className="nav-link text-white">Register</Link>
            </li>
            <li className="nav-item hover-links"><Link to="/signin" className="nav-link text-white">Sign in</Link></li>
        </ul>

    )

}

export default NavigationNotLoggedIn;