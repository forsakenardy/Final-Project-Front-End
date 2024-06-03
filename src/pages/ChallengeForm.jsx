const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth.context";

function ChallengeForm({ matches, locations, getMatch }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    /* const handleBook = (e) => {
         e.preventDefault();
 
     }*/

    const handleJoin = (matchId) => {
        axios.put(
            `${API_URL}/matches/${matchId}`,
            { userId: user._id }
        )
            .then(() => {
                console.log("user joined the match")
            })
            .catch((error) => { console.log(error) })
    }

    const handleCancelMatch = (matchId) => {
        //if(loggedIn user creates de match, he/she can delete it)
        axios.delete(`${API_URL}/matches/${matchId}`)
            .then(() => {
                getMatch()

            })
            .catch((error) => { console.error("there was an error cancelling the match", error) })
    }


    return (
        <div>
            {matches && matches.map((match) => {
                return (
                    <div key={match._id}>

                        <p>{match.location?.name ? match.location.name : "WTF man"}</p>
                        <p>{match.day} {match.time}</p>
                        <p>{match.comment}</p>
                        <p>{match.pairs}</p>
                        <button onClick={() => handleJoin(match._id)}>Join!</button>
                        <button onClick={() => handleCancelMatch(match._id)}>Cancel</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ChallengeForm