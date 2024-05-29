import { NavLink, Link } from "react-router-dom"

function NavbarLogged() {
    return (
        <>
            <div>
                <div>
                    <NavLink to="/"><h1>Home</h1></NavLink>
                    <NavLink to="/locations"><h1>Locations</h1></NavLink>
                    <NavLink to="/events"><h1>Events</h1></NavLink>
                    <NavLink to="/users"><h1>Users</h1></NavLink>
                </div>
                <img src="" alt="perfil image" />
            </div>
            <div>
                <NavLink to="/profile"><h2>View Profile</h2></NavLink>
                <NavLink to="/matches"><h2>Play's History</h2></NavLink>
                <Link to="/"><h1>Log Out</h1></Link>
            </div>
        </>
    )
}

export default NavbarLogged