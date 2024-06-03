import "../styles/users.css"
import { NavLink } from "react-router-dom"

function Users({ profile }) {

    return (
        <div className="users">
            {
                profile.map((user) => {
                    return (
                        <div className="user-card">
                            <h2>{user.name}</h2>
                            <h2>{`rank: ${user.rank}`}</h2>
                            <h2>{`location: ${user.location}`}</h2>
                            <NavLink to="/creatematches" ><button>Send a challenge</button></NavLink>

                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default Users