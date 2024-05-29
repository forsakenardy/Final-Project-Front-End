import { NavLink } from "react-router-dom"
import "../styles/footer.css"

function Footer() {
    return (
        <div className="footer">
            <h1 className="copiright">copyright blablabla</h1>
            <div className="footer-icons">
                <img src="" alt="icon1" />
                <img src="" alt="icon2" />
                <img src="" alt="icon3" />
            </div>
            <div className="end">
                <NavLink to="/aboutUs"><h1>About Us</h1></NavLink>
                <img className="company-logo" src="" alt="Company Logo" />
            </div>

        </div>
    )
}

export default Footer