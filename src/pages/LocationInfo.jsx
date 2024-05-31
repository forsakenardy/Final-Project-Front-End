import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/locations-info.css"

function LocationInfo({ locations, getLocations }) {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const [locationCard, setLocationCard] = useState(null);


    useEffect(() => {
        getLocations();
    }, []);

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
            <img className="locationinfo-image" src={locationCard.image} alt="location-image" />
            <h1 className="location-name1">{locationCard.name}</h1>
            <h3 className="location-place" >{locationCard.place}</h3>
            <h3 className="location-rackets" >{locationCard.rackets ? "rackets available" : "rackets not available"}</h3>
            <h3 className="location-net">{`type of net: ${locationCard.net}`}</h3>
            <h3 className="location-barServise" >{locationCard.barService ? "We have bar service" : "We dont have bar service"}</h3>
            <p className="location-description" >{locationCard.description}</p>
        </div>
    );
}

export default LocationInfo;
