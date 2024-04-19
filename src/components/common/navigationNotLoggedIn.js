import {Link} from "react-router-dom";

const NavigationNotLoggedIn = () => {
    return (

            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link text-white">Register</Link></li>
                <li className="nav-item"><Link to="/signin" className="nav-link text-white">Sign in</Link></li>
            </ul>

    )

}

export default NavigationNotLoggedIn;