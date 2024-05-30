import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function LocationInfo({ locations, getLocations }) {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const [locationCard, setLocationCard] = useState(null);


    useEffect(() => {
        getLocations();
    }, [getLocations]);

    useEffect(() => {
        if (locations.length > 0 && locationId) {
            const currentIndex = locations.findIndex((location) => location._id === (locationId));
            if (currentIndex !== -1) {
                setLocationCard(locations[currentIndex]);
            } else {
                console.error("Location not found");
                navigate("/404");
            }
        }
    }, [locations, locationId, navigate]);



    if (!locationCard) {
        return <div>Loading...</div>;
    }
    console.log(locationCard.image)

    return (
        <div key={locationCard._id} className="location-info">
            <img src={locationCard.image} alt="location-image" />
        </div>
    );
}

export default LocationInfo;
