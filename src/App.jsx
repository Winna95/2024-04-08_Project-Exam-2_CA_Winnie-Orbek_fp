import './App.css';
import Venues from "./components/homepage/homepage";
import './App.scss'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import RegisterForm from "./components/register/register";
import SignInForm from "./components/signIn/signIn";
import IndividualVenue from "./components/venueIndividualPage/venueIndividualPage";
import Profile from "./components/Profile/profile";

/**
 * Main component representing the application.
 * @returns {JSX.Element} - JSX element containing the application layout and routing.
 */
function App() {
    return (
        <div className="light-blue-bg">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Venues/>}/>
                    <Route path="venue/:id" element={<IndividualVenue/>}/>
                    <Route path="register" element={<RegisterForm/>}/>
                    <Route path="signin" element={<SignInForm/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="*" element={<div>Route not found</div>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
