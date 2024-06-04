import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"



const API_URL = import.meta.env.VITE_API_URL;


function Matches({ match, locations, getMatch, getLocations}) {
    const [location, setLocation] = useState("665854f95f1cf9b18bc43d45");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("09:00");
    const [comment, setComment] = useState("");
    const [pairs, setPairs] = useState(false);
    
    const today = new Date()

    const handleLocation = (e) => setLocation(e.target.value);
    const handleDay = (e) => setDay(e.target.value);
    const handleTime = (e) => setTime(e.target.value);
    const handleComment = (e) => setComment(e.target.value);
    const handlePairs = (e) => setPairs(e.target.value);
    const navigate = useNavigate();

    const handleMatchSubmit = (e) => {

       e.preventDefault();
        const requestBody = { location, day, time, comment, pairs }; 
        console.log(requestBody)
        axios.post(`${API_URL}/matches/`, requestBody)
            .then((data) => {
                getMatch();
                navigate("/users/challengeform");

            })
            .catch((error) => {

                console.log("there's been some kind of error", error)
            })
    }

const requestedForm = {location, day, time, comment}
    return (
        <div>
            <form onSubmit={requestedForm ? handleMatchSubmit : "You need to fill the location, day, time and comment"}>
                <label>Location:</label>
                <select type="text" name="location" onChange={handleLocation}>
                    {locations.map((location) => {

                        return (

                            <option value={location._id} key={location._id}>{location.name}</option>

                        )

                    })}
                </select>
                <label>Day:</label>
                <input type="date" value={day} min={today.toISOString().slice(0, 10)} onChange={handleDay} />
                <label>Time:</label>
                <select name="time" value={time} onChange={handleTime}>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                </select>
                <label>Comment:</label>
                <input type="text" name="comment" value={comment} onChange={handleComment} />
                <label>Pairs:</label>
                <select name="pairs" value={pairs} onChange={handlePairs}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <button type="submit">Matching!</button>
               
            </form>
        </div>
    )
}

export default Matches