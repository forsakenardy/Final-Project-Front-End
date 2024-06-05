import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

function Navbar() {
    const [isPressed, setIsPressed] = useState(false);
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    const closeMenu = (event) => {
        if (isPressed && !event.target.closest('.menu-links')) {
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
    const defaultImage = "https://i.ibb.co/yyVDCt2/user-removebg-preview.png"


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
                        onClick={toggleClass}
                        className="profile1-image"
                        src={!user.image ? defaultImage : user.image}
                        alt="perfil image"
                    />
                }
                {isLoggedIn &&
                    <div className={isPressed ? 'menu-links' : 'hidden'}>
                        <NavLink onClick={toggleClass} to={`/profile/${user._id}`}><h1>View Profile</h1></NavLink>
                        <NavLink onClick={toggleClass} to="/creatematches"><h1>Matches</h1></NavLink>
                        <NavLink onClick={toggleClass} to="/users/challengeform"><h1>Play's History</h1></NavLink>
                        <Link to="/"><button onClick={() => {
                            logOutUser();
                            toggleClass();
                        }}>Log Out</button></Link>
                        <span>{user && user.name}</span>
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
