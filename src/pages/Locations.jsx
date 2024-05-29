import { Link } from "react-router-dom"

function Locations({ locations }) {

    return (
        <div  className="locations">
            {
                locations.map((location) => {
                    return (
                      <Link key={location._id} to={`/locations/${location._id}`} >
                        <h2>{location.place}</h2>
                      </Link>

                    )
                }
                )
            }
        </div>
    )
}

export default Locations