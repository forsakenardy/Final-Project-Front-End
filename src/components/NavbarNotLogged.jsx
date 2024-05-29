import { NavLink, Link } from "react-router-dom"

function NavbarNotLogged() {
    return (
        <div>
            <div>
                <NavLink to="/"><h1>Home</h1></NavLink>
                <NavLink to="/locations"><h1>Locations</h1></NavLink>
                <NavLink to="/events"><h1>Events</h1></NavLink>
            </div>
            <div>
                <NavLink to="/signForm"><h1>Sign Up</h1></NavLink>
                <NavLink to="/loginForm"><h1>Log In</h1></NavLink>
            </div>
        </div>
    )
}

export default NavbarNotLogged