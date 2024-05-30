import { Link } from "react-router-dom"
import "../styles/locations.css"

function Locations({ locations }) {

    return (
        <div className="locations">
            {
                locations.map((location) => {
                    return (

                        <Link key={location._id} to={`/locations/${location._id}`} >
                            <div className="location-cards">
                                <img className="location-image" src={location.image} alt="location image" />
                                <h2 className="location-name">{location.name}</h2>
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