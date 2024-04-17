import './App.css';
import Venues from "./components/homepage/homepage";
import './Custom.scss';
import './App.scss'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import RegisterForm from "./components/register/register";
import SignInForm from "./components/signIn/signIn";
import IndividualVenue from "./components/venueIndividualPage/venueIndividualPage";
import Profile from "./components/Profile/profile";


function App() {
  return (
    <div className="light-blue-bg">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Venues />} />
                <Route path="homepage/:id" element={<IndividualVenue />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="signin" element={<SignInForm />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<div>Route not found</div>} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
