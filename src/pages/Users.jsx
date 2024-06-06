import "../styles/users.css"
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
            <div className="user-card">
                <h4 className="user-card1">Name</h4>
                <h5 className="user-card1">Rank</h5>
                <h4 className="user-card1">Location</h4>
                <h4 className="foto">Photo</h4>
            </div>
            {
                profile && profile.map((user) => {
                    return (
                        <div key={user._id} className="user-card">

                            <p>{user.name}</p>
                            <h5>{user.rank}</h5>
                            <p>{user.location}</p>
                            <img className="usersPage-image" src={user.image} alt="" />
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default Users