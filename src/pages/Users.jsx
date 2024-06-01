import "../styles/users.css"

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
                            <button>Send a challenge</button>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default Users