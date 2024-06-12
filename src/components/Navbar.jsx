import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

function Navbar() {
    const [isPressed, setIsPressed] = useState(false);
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    const closeMenu = (event) => {
        const profileImage = document.querySelector(".profile1-image")
        if (isPressed && !event.target.closest('.menu-links') && event.target !== profileImage) {
            setIsPressed(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);


        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, [isPressed]);

    const toggleClass = () => {
        setIsPressed((prevState) => !prevState);
    };
    const defaultImage = "https://i.ibb.co/qjKcLX3/usuario-removebg-preview.png"

    return (
        <>
            <div className="navbar">
                <div className="navlinks">
                    <NavLink to="/"><h4>Home</h4></NavLink>
                    <NavLink to="/locations"><h4>Locations</h4></NavLink>
                    <NavLink to="/events"><h4>Events</h4></NavLink>

                    {isLoggedIn && <NavLink to="/users"><h4>Users</h4></NavLink>}
                </div>
                {isLoggedIn &&
                    <img 
                        onClick={(toggleClass)}
                        className="profile1-image"
                        src={!user.image ? defaultImage : user.image}
                        alt="perfil image"
                    />
                }
                {isLoggedIn &&
                    <div className={isPressed ? 'menu-links': 'hidden'}>
                        <NavLink onClick={toggleClass} to={`/profile/${user._id}`}><h1>View Profile</h1></NavLink>
                        <NavLink onClick={toggleClass} to="/creatematches"><h1>Create Match</h1></NavLink>
                        <NavLink onClick={toggleClass} to="/users/challengeform"><h1>Matches</h1></NavLink>
                        <Link to="/"><button className="cancel margin-left" onClick={() => {
                            logOutUser();
                            toggleClass();
                        }}>Log Out</button></Link>
                    </div>
                }
                {!isLoggedIn &&
                    <div className="navlinks ">
                        <NavLink to="/signup"><h4>Sign Up</h4></NavLink>
                        <NavLink to="/loginForm"><h4>Log In</h4></NavLink>
                    </div>
                }
            </div>
        </>
    );
}

export default Navbar;
