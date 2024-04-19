import NavigationNotLoggedIn from "./navigationNotLoggedIn";
import {useSelector} from "react-redux";
import NavigationLoggedIn from "./navigationLoggedIn";


const Navigation = () => {
    const loggedIn = useSelector((state) => state.loggedIn.value);
    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-collapse justify-content-end">
                { loggedIn ? <NavigationLoggedIn/> : <NavigationNotLoggedIn/>}
            </div>
        </nav>
    );
}

export default Navigation;