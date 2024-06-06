import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleLoginSubmit = (e) => {
        console.log("login");
        e.preventDefault();
        const requestBody = { email, password };
        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log("JWT token", response.data.authToken)
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/')
            })
            .catch((error) => {
                const errorDescription = error.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="sign-page ">
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />
                <button className="reserve" type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p>What are you doing without an account? Hurry up and <Link to="/signup">Sign Up</Link> </p>
        </div>
    )
}

export default LoginForm