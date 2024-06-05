import { Link } from "react-router-dom"
import "../styles/locations.css"
import { useNavigate } from "react-router-dom"

function Locations({ locations }) {
    const navigate = useNavigate()
    return (
        <div className="locations">
            {
                locations.map((location) => {
                    return (

                        <Link key={location._id} to={`/locations/${location._id}`} >
                            <div className="location-cards">
                                <img className="location-image" src={location.image} alt="location image" />
                                <h3 className="location-name">{location.name}</h3>
                                <div className="h6-locations">
                                    <p>Location</p>
                                    <h4>{location.place}</h4>
                                    <p>Rakets</p>
                                    <h4>{location.rackets ? "Rackets available" : "Rackets not available"}</h4>
                                </div>

                            </div>
                        </Link>

                    )
                }
                )
            }
        </div>
    )
}

export default Locations