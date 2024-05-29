import { NavLink, Link } from "react-router-dom"

function Footer () {
    return (
       <div>
        <h1>copyright blablabla</h1>
        <div>
            <img src="" alt="icon1" />
            <img src="" alt="icon2" />
            <img src="" alt="icon3" />
        </div>
        <NavLink to="/aboutUs"><h1>About Us</h1></NavLink>
        <img src="" alt="Company Logo" />
       </div>
    )
}

export default Footer