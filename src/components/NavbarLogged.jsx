import { NavLink, Link } from "react-router-dom"
import "../styles/navbar.css"
import { useState } from "react";

function NavbarLogged() {

    const [isPressed, setIsPressed] = useState(false);

    const toggleClass = () => {
      setIsPressed((prevState) => !prevState);
    };

    return (
        <>
            <div className="navbar">
                <div className="navlinks">
                    <NavLink to="/"><h1>Home</h1></NavLink>
                    <NavLink to="/locations"><h1>Locations</h1></NavLink>
                    <NavLink to="/events"><h1>Events</h1></NavLink>
                    <NavLink to="/users"><h1>Users</h1></NavLink>
                </div>
                <img onClick={toggleClass} className="perfil-image" src="" alt="perfil image" />
            </div>
            <div className={ isPressed ? 'menu-links' : 'hidden'}>
                <NavLink to="/profile"><h1>View Profile</h1></NavLink>
                <NavLink to="/matches"><h1>Play's History</h1></NavLink>
                <Link to="/"><h1>Log Out</h1></Link>
            </div>
        </>
    )
}

export default NavbarLogged