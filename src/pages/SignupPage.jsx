import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";
import axios from "axios";

function SignupPage(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] =useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

const navigate = useNavigate();

const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);
const handleName = (e) => setName(e.target.value)
const handleLocation = (e) => setLocation(e.target.value)

const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {email, password, name, location};

}

}