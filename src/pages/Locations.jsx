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
                                <h2 className="location-name">{location.name}</h2>
                                <div className="h6-locations">
                                    <h6>{location.place}</h6>
                                    <h6>{location.rackets ? "Rackets available" : "Rackets not available"}</h6>
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