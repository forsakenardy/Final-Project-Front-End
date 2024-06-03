import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth.context";
import "../styles/locations-info.css";

function LocationInfo({ locations, getLocations }) {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useContext(AuthContext);

    const [locationCard, setLocationCard] = useState(null);
    const [reservations, setReservations] = useState(() => {
        if (isLoggedIn && user) {
            const savedReservations = localStorage.getItem(`reservations_${user._id}`);
            return savedReservations ? JSON.parse(savedReservations) : [];
        }
        return [];
    });
    const [isReserved, setIsReserved] = useState(false);

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        if (locations.length > 0 && locationId) {
            const currentIndex = locations.findIndex((location) => location._id === locationId);
            if (currentIndex !== -1) {
                setLocationCard(locations[currentIndex]);
                setIsReserved(reservations.some(reservation => reservation.locationId === locationId && reservation.userId === user._id));
            } else {
                console.error("Location not found");
                navigate("/404");
            }
        }
    }, [locations, locationId, navigate, reservations, user]);

    const handleReservationClick = () => {
        const newReservation = {
            locationId: locationCard._id,
            userId: user._id,
            locationName: locationCard.name,
            // Agrega más detalles de la reserva según tus necesidades
        };
        setReservations([...reservations, newReservation]);
        setIsReserved(true);
    };

    const handleCancelReservation = () => {
        const updatedReservations = reservations.filter(reservation => !(reservation.locationId === locationId && reservation.userId === user._id));
        setReservations(updatedReservations);
        setIsReserved(false);
    };

    useEffect(() => {
        if (isLoggedIn && user) {
            localStorage.setItem(`reservations_${user._id}`, JSON.stringify(reservations));
        }
    }, [reservations, isLoggedIn, user]);

    if (!locationCard) {
        return <div>Loading...</div>;
    }

    return (
        <div key={locationCard._id} className="location-info">
            <img className="locationinfo-image" src={locationCard.image} alt="location-image" />
            <h1 className="location-name1">{locationCard.name}</h1>
            <h3 className="location-place">{locationCard.place}</h3>
            <h3 className="location-rackets">{locationCard.rackets ? "rackets available" : "rackets not available"}</h3>
            <h3 className="location-net">{`type of net: ${locationCard.net}`}</h3>
            <h3 className="location-barServise">{locationCard.barService ? "We have bar service" : "We don't have bar service"}</h3>
            <p className="location-description">{locationCard.description}</p>
            {isLoggedIn && !isReserved && (
                <button className="reservar" onClick={handleReservationClick}>Reserve</button>
            )}
            {isReserved && (
                <div>
                    <h1>Reserved by {user.name}</h1>
                    <button className="cancel-reservation" onClick={handleCancelReservation}>Cancel Reservation</button>
                </div>
            )}
        </div>
    );
}

export default LocationInfo;
