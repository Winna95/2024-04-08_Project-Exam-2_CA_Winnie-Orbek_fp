import '../../App.scss'

/**
 * Footer component for the Holidaze Booking application.
 * This component renders a footer with copyright information.
 * @returns {JSX.Element} The rendered footer component.
 */
function Footer() {
    return <footer className="dark-blue-bg text-white ps-2">
        <h5 className="mb-0 pt-2 fw-normal">Holidaze Booking</h5>
        <p className="my-0 fw-light">Copyright © 2024 Holidaze Booking</p>
        <p className="mt-0 pb-2 fw-light">All rights reserved</p>
    </footer>
}

export default Footer;