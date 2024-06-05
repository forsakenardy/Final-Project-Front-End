import "../styles/users.css"
import { NavLink } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Users({ profile, matches }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const userId = user ? user._id : null;
    const userName = user ? user.name : null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChallenge = async (matchId) => {

        if (!matches.find((match) => match._id === matchId).participants.some(participant => participant.userId === userId)) {

            setLoading(true);
            setError(null);
            try {
                const response = await axios.post(`${API_URL}/matches/${matchId}`)

                if (response.status === 200) {
                    throw new Error("error getting into the match, you coward!")
                }
            }catch(error){
                setError(error)
            } finally {
                setLoading(false)
            }
    }
    }

    return (
        <div className="users">
            {
                profile && profile.map((user) => {
                    return (
                        <div key={user._id} className="user-card">
                            <h2>{user.name}</h2>
                            <h2>{`Rank: ${user.rank}`}</h2>
                            <h2>{`Location: ${user.location}`}</h2>
                            <NavLink to="/creatematches" ><button onSubmit={handleChallenge}>Send a challenge</button></NavLink>

                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default Users