import "../styles/editmatch.css"
import { AuthContext } from "../auth.context"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function EditMatch({ getMatch, locations }) {
    const { user } = useContext(AuthContext)
    const { matchId } = useParams()
    const today = new Date()
    const navigate = useNavigate()

    const [location, setLocation] = useState("")
    const [day, setDay] = useState("")
    const [time, setTime] = useState("09:00")
    const [comment, setComment] = useState("");
    const [pairs, setPairs] = useState(false);

    const handleLocation = (e) => setLocation(e.target.value);
    const handleDay = (e) => setDay(e.target.value);
    const handleTime = (e) => setTime(e.target.value);
    const handleComment = (e) => setComment(e.target.value);
    const handlePairs = (e) => setPairs(e.target.value);


    const handleEdit = (e, matchId) => {
        e.preventDefault();
        const requestBody = { location, day, time, comment, pairs, createdBy: user._id };
        axios.put(`${API_URL}/matches/${matchId}`, requestBody)
            .then((data) => {
                getMatch();
                navigate("/users/challengeform");

            })
            .catch((error) => {


            })
    }





    const requestedForm = { location, day, time, comment }
    return (
        <>
            <div className="edit-title">

                <h2>Edit match</h2>
            </div>
            <form className="matches-edit" onSubmit={(e) => handleEdit(e, matchId)}>
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
                <button type="submit">Commit changes</button>

            </form>
        </>
    )
}
export default EditMatch