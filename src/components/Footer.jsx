import { NavLink } from "react-router-dom"
import "../styles/footer.css"

function Footer() {
    return (
        <div className="footer">
            <p className="copiright">&copy; 2024 Developed by Arnaldo Mera and Mikel Jiménez</p>
            <div className="footer-icons">
                <div className="front-end">
                    <a target="blank" href="https://github.com/forsakenardy/Final-Project-Front-End"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.668 24.5C19.2954 24.5 24.668 19.1274 24.668 12.5C24.668 5.87258 19.2954 0.5 12.668 0.5C6.04055 0.5 0.667969 5.87258 0.667969 12.5C0.667969 19.1274 6.04055 24.5 12.668 24.5Z" fill="#D9D9D9" />
                        <path d="M12.668 4.5C8.25064 4.5 4.66797 8.17255 4.66797 12.7022C4.66797 16.3263 6.95997 19.4007 10.1393 20.4855C10.5386 20.5614 10.668 20.3071 10.668 20.0911V18.5641C8.44264 19.0603 7.9793 17.5962 7.9793 17.5962C7.6153 16.6482 7.09064 16.396 7.09064 16.396C6.36464 15.8868 7.14597 15.8977 7.14597 15.8977C7.9493 15.9551 8.37197 16.7432 8.37197 16.7432C9.0853 17.9968 10.2433 17.6345 10.7 17.4247C10.7713 16.895 10.9786 16.5327 11.208 16.3283C9.4313 16.1198 7.5633 15.4165 7.5633 12.2744C7.5633 11.3783 7.87597 10.6469 8.3873 10.0727C8.30464 9.86563 8.03064 9.03106 8.4653 7.90188C8.4653 7.90188 9.1373 7.68179 10.666 8.74261C11.304 8.56079 11.988 8.46989 12.668 8.46647C13.348 8.46989 14.0326 8.56079 14.672 8.74261C16.1993 7.68179 16.87 7.90188 16.87 7.90188C17.3053 9.03174 17.0313 9.86632 16.9486 10.0727C17.462 10.6469 17.772 11.3789 17.772 12.2744C17.772 15.4247 15.9006 16.1185 14.1193 16.3215C14.406 16.5758 14.668 17.0747 14.668 17.8403V20.0911C14.668 20.3091 14.796 20.5655 15.202 20.4848C18.3786 19.3987 20.668 16.3249 20.668 12.7022C20.668 8.17255 17.086 4.5 12.668 4.5Z" fill="#1F1F1F" />
                    </svg></a>
                    <p>Front End</p>
                </div>
                <div className="back-end">
                    <a target="blank" href="https://github.com/Saymar567/final-project"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.668 24.5C19.2954 24.5 24.668 19.1274 24.668 12.5C24.668 5.87258 19.2954 0.5 12.668 0.5C6.04055 0.5 0.667969 5.87258 0.667969 12.5C0.667969 19.1274 6.04055 24.5 12.668 24.5Z" fill="#D9D9D9" />
                        <path d="M12.668 4.5C8.25064 4.5 4.66797 8.17255 4.66797 12.7022C4.66797 16.3263 6.95997 19.4007 10.1393 20.4855C10.5386 20.5614 10.668 20.3071 10.668 20.0911V18.5641C8.44264 19.0603 7.9793 17.5962 7.9793 17.5962C7.6153 16.6482 7.09064 16.396 7.09064 16.396C6.36464 15.8868 7.14597 15.8977 7.14597 15.8977C7.9493 15.9551 8.37197 16.7432 8.37197 16.7432C9.0853 17.9968 10.2433 17.6345 10.7 17.4247C10.7713 16.895 10.9786 16.5327 11.208 16.3283C9.4313 16.1198 7.5633 15.4165 7.5633 12.2744C7.5633 11.3783 7.87597 10.6469 8.3873 10.0727C8.30464 9.86563 8.03064 9.03106 8.4653 7.90188C8.4653 7.90188 9.1373 7.68179 10.666 8.74261C11.304 8.56079 11.988 8.46989 12.668 8.46647C13.348 8.46989 14.0326 8.56079 14.672 8.74261C16.1993 7.68179 16.87 7.90188 16.87 7.90188C17.3053 9.03174 17.0313 9.86632 16.9486 10.0727C17.462 10.6469 17.772 11.3789 17.772 12.2744C17.772 15.4247 15.9006 16.1185 14.1193 16.3215C14.406 16.5758 14.668 17.0747 14.668 17.8403V20.0911C14.668 20.3091 14.796 20.5655 15.202 20.4848C18.3786 19.3987 20.668 16.3249 20.668 12.7022C20.668 8.17255 17.086 4.5 12.668 4.5Z" fill="#1F1F1F" />
                    </svg></a>
                    <p>Back End</p>
                </div>
                <div className="company">
                    <NavLink to="/aboutUs">
                        <img className="company-logo" src="https://i.ibb.co/Kb4tD7K/OIG2-removebg-preview.png" alt="Company Logo" />
                        <p>About Us</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer