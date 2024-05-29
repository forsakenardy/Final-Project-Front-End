import { NavLink } from "react-router-dom"
import "../styles/navbar.css"

function NavbarNotLogged() {
    return (
        <div className="navbar">
            <div className="navlinks">
                <NavLink to="/"><h1>Home</h1></NavLink>
                <NavLink to="/locations"><h1>Locations</h1></NavLink>
                <NavLink to="/events"><h1>Events</h1></NavLink>
            </div>
            <div className="navlinks ">
                <NavLink to="/signForm"><h1>Sign Up</h1></NavLink>
                <NavLink to="/loginForm"><h1>Log In</h1></NavLink>
            </div>
        </div>
    )
}

export default NavbarNotLogged