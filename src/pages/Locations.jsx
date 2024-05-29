import { Link } from "react-router-dom"

function Locations({ locations }) {

    return (
        <div className="locations">
            {
                locations.map((location) => {
                    return (
                      <Link to={`/locations/${location.id}`} >
                      </Link>
                    )
                }
                )
            }
        </div>
    )
}

export default Locations