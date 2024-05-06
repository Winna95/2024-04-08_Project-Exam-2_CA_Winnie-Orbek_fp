import NavigationNotLoggedIn from "./navigationNotLoggedIn";
import {useDispatch, useSelector} from "react-redux";
import NavigationLoggedIn from "./navigationLoggedIn";
import {useEffect} from "react";
import {setLoggedInState} from "../redux/loggedInSlice";
import "./global.scss"


const Navigation = () => {
    const loggedIn = useSelector((state) => state.loggedIn.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const name = localStorage.getItem("name")
       const jwt =  localStorage.getItem("jwt")
        const apiKey = localStorage.getItem("apiKey")
        if(name && jwt && apiKey) {
            dispatch(setLoggedInState(true));
        }
    }, []);
    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-collapse justify-content-end">
                { loggedIn ? <NavigationLoggedIn/> : <NavigationNotLoggedIn/>}
            </div>
        </nav>
    );
}

export default Navigation;