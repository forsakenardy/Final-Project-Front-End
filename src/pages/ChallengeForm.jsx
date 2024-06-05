const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/challengeform.css"

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


    const handleCancelMatch = (matchId) =>{
        axios.delete(`${API_URL}/matches/${matchId}/${user._id}`)
        .then(()=> {
            console.log("match deleted")
            getMatch()})
        .catch(()=> console.log("error deleting the match"))

    }

    return (
        <div>
            {matches && matches.map((match) => {
                return (
                    <div className="matches-to-join" key={match._id}>

                        <p>{match.location?.name ? match.location.name : "WTF man"}</p>
                        <p>{match.day} {match.time}</p>
                        <p>{match.comment}</p>
                        <p>{match.pairs}</p>
                        <p>Created by: {match.createdBy?.name ? match.createdBy.name : "No name, no party"}</p>
                        <p>{match.participants.map((participant) => participant.name)}</p>

                        {!checkId(match.participants, user) ? <button onClick={() => handleJoin(match._id)}>Join!</button> : "You are booked"}

                        {checkId(match.participants, user) && <button onClick={()=> handleUnbook(match._id)}>Unbook</button> }
                         {match.createdBy?.name === user.name && <button onClick={() => handleCancelMatch(match._id)}>Delete match</button>} {/*que solo tenga el botón quien haya creado el partido*/}


                    </div>
                )
            })}
        </div>
    )
}

export default ChallengeForm