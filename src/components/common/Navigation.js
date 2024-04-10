import {Link} from "react-router-dom";

const Navigation = () => {


    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-collapse justify-content-end">
            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link text-white">Register</Link></li>
                <li className="nav-item"><Link to="/signIn" className="nav-link text-white">Sign in</Link></li>
            </ul>
            </div>
        </nav>
    );
}

export default Navigation;