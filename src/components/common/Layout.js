import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";


/**
 * Layout component for the Holidaze Booking application.
 * This component defines the overall layout structure of the application,
 * including the header, main content (using React Router's Outlet), and footer.
 * @returns {JSX.Element} The rendered layout component.
 */
function Layout() {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;