const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ChallengeForm({ matches, locations, getMatch }) {
    const navigate = useNavigate();
    const handleBook = (e)=>{
e.preventDefault();

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
                        <button>Join!</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ChallengeForm