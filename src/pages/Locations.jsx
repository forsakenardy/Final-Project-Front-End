import { Link } from "react-router-dom"

function Locations({ locations }) {

    return (
        <div  className="locations">
            {
                locations.map((location) => {
                    return (

                        <Link key={location._id} to={`/locations/${location._id}`} >
                            <div className="location-cards">
                                <img src="" alt="location image" />
                                <h2>{location.description}</h2>
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