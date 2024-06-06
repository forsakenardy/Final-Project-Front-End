const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/challengeform.css"
import { Link } from "react-router-dom";

function ChallengeForm({ matches, getMatch }) {

    function checkId(participantsArr, user) {
        for (let i in participantsArr) {
            if (participantsArr[i]._id === user._id) {
                return true
            }
        }
        return null
    }

    const { user } = useContext(AuthContext);

    const handleJoin = (matchId) => {
        axios.put(
            `${API_URL}/matches/${matchId}`,
            { userId: user._id }
        )
            .then(() => {
                console.log("user joined the match");
                getMatch()
            })
            .catch((error) => { console.log(error) })
    }

    const handleUnbook = (matchId) => {
        axios.put(`${API_URL}/matches/cancel/${matchId}`, { userId: user._id })
            .then(() => {
                console.log("user removed from the match")
                getMatch()
            })
            .catch((error) => { console.log(error) })
    }


    const handleCancelMatch = (matchId) => {
        axios.delete(`${API_URL}/matches/${matchId}/${user._id}`)
            .then(() => {
                console.log("match deleted")
                getMatch()
            })
            .catch(() => console.log("error deleting the match"))

    }


    return (
        <div>
            {matches && matches.map((match) => {
                return (
                    <div className="matches-to-join" key={match._id}>
                        <div className="matches-to-join-title">
                            <p>{match.location?.name ? match.location.name : "WTF man"}</p>
                        </div>
                        <p>{match.day} {match.time}</p>
                        <p>{match.comment}</p>
                        <p>{match.pairs}</p>
                        <p>Created by: {match.createdBy?.name ? match.createdBy.name : "No name, no party"}</p>

                        <p>{match.participants.map((participant) => participant.name)}</p>
                        <div className="button-position">

                        {!checkId(match.participants, user) ? <button className="reserve" onClick={() => handleJoin(match._id)}>Join match</button> : "You are booked"}

                        {checkId(match.participants, user) && <button className="go-back-button" onClick={() => handleUnbook(match._id)}>Unbook</button>}
                        </div>
                        <div className="delete-match-position">
                        {match.createdBy?.name === user.name && <Link to={`/editmatch/${match._id}`}> <button className="go-back-button">Edit match</button></Link>}

                        {match.createdBy?.name === user.name && <button className="cancel" onClick={() => handleCancelMatch(match._id)}>Delete match</button>}
                        </div>


                    </div>
                )
            })}
        </div>
    )
}

export default ChallengeForm