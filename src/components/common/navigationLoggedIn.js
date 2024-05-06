import {Link, useNavigate} from "react-router-dom";
import {setLoggedInState} from "../redux/loggedInSlice";
import {useDispatch} from "react-redux";

const NavigationLoggedIn = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    function onClickSignOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("name");
        localStorage.removeItem("apiKey");
        dispatch(setLoggedInState(false));
        navigate("/");
    }
    return (
        <ul className="navbar-nav">
            <li className="nav-item hover-links"><Link to="/" className="nav-link text-white">Home</Link></li>
            <li className="nav-item hover-links"><Link to="/profile" className="nav-link text-white">Profile</Link></li>
            <li className="nav-item hover-links"><button onClick={() => onClickSignOut()} className="nav-link text-white">Sign out</button></li>
        </ul>

    )

}

export default NavigationLoggedIn;