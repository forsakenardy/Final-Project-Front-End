import { useState } from "react"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Matches({ match, /*createMatches*/ }) {
    const [location, setLocation] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [comment, setComment] = useState("");
    const [pairs, setPairs] = useState(false)

const handleLocation = (e)=> setLocation(e.target.value);
const handleDay = (e)=> setDay(e.target.value);
const handleTime = (e)=> setTime(e.target.value);
const handleComment = (e)=> setComment(e.target.value);
const handlePairs = (e)=> setPairs(e.target.value);


    const handleMatchSubmit =
    e.preventDefault();
const requestBody = {location, day, time, comment, pairs};


    return (
        <div>
<form onSubmit={handleMatchSubmit}>
    <label>Location:</label>
    <input type="text" name="location" value={location} onChange={handleLocation} />
    <label></label>
</form>
        </div>
    )
}

export default Matches