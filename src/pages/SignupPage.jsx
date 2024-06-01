import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import "../styles/signUpPage.css"

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value)
    const handleLocation = (e) => setLocation(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name, location };
        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription)
            })

    }
    return (
        <div className="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={handleName} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleEmail} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} />
                </div>
                <div>
                    <label>Location:</label>
                    <select name="location" value={location} onChange={handleLocation}>
                        <option value="bilbao">Bilbao</option>
                        <option value="barcelona">Barcelona</option>
                        <option value="madrid">Madrid</option>
                        <option value="la habana">La Habana</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Already have an account?</p>
            <Link to="/Loginform">Login</Link>
        </div>
    )
}

export default SignupPage