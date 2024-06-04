import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth.context";
import axios from "axios";
import "../styles/locations-info.css";

const API_URL = import.meta.env.VITE_API_URL;

function LocationInfo({ locations, getLocations }) {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useContext(AuthContext);

    const [locationCard, setLocationCard] = useState(null);
    const [reservedIndices, setReservedIndices] = useState([]);

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        if (locations.length > 0 && locationId) {
            const currentIndex = locations.findIndex((location) => location._id === locationId);
            if (currentIndex !== -1) {
                setLocationCard(locations[currentIndex]);
                const storedReservedIndices = JSON.parse(localStorage.getItem("reservedIndices")) || [];
                setReservedIndices(storedReservedIndices);
            } else {
                console.error("Location not found");
                navigate("/404");
            }
        }
    }, [locations, locationId, navigate]);

    const handleReserveClick = async (horarioIndex) => {
        try {
            const updatedLocation = { ...locationCard };

            if (!updatedLocation.horarios[horarioIndex].reserved) {
                updatedLocation.horarios[horarioIndex].reserved = true;
                updatedLocation.horarios[horarioIndex].reservedby = user.name;

                const response = await axios.put(`${API_URL}/locations/${locationId}`, updatedLocation);
                if (response.status === 200) {
                    setLocationCard(updatedLocation);
                    const updatedReservedIndices = [...reservedIndices, horarioIndex];
                    setReservedIndices(updatedReservedIndices);
                    localStorage.setItem("reservedIndices", JSON.stringify(updatedReservedIndices));
                    getLocations();
                } else {
                    console.error("Failed to update reservation status");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleCancelReservation = async (horarioIndex) => {
        try {
            const updatedLocation = { ...locationCard };
            updatedLocation.horarios[horarioIndex].reserved = false;
            updatedLocation.horarios[horarioIndex].reservedby = "";
            const response = await axios.put(`${API_URL}/locations/${locationId}`, updatedLocation);
            if (response.status === 200) {
                setLocationCard(updatedLocation);
                const updatedReservedIndices = reservedIndices.filter(index => index !== horarioIndex);
                setReservedIndices(updatedReservedIndices);
                localStorage.setItem("reservedIndices", JSON.stringify(updatedReservedIndices));
                getLocations();
            } else {
                console.error("Failed to update reservation status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (!locationCard) {
        return <div>Loading...</div>;
    }

    return (
        <div key={locationCard._id} className="location-info">
            <img className="locationinfo-image" src={locationCard.image} alt="location-image" />
            <h1 className="location-name1">{locationCard.name}</h1>
            <p className="location-description">{locationCard.description}</p>
            <h3 className="location-place">{locationCard.place}</h3>
            <h3 className="location-rackets">{locationCard.rackets ? "rackets available" : "rackets not available"}</h3>
            <h3 className="location-net">{`type of net: ${locationCard.net}`}</h3>
            <h3 className="location-barServise">{locationCard.barService ? "We have bar service" : "We don't have bar service"}</h3>

            <ul>
                {locationCard.horarios.map((horario, index) => (
                    <li key={index}>
                        <div className="horario">
                            <h5>From: {horario.horaInicio} to: {horario.horaFin}</h5>
                            {isLoggedIn && !horario.reserved && (
                                <button className="reservar" onClick={() => handleReserveClick(index)}>Reserve</button>
                            )}
                            {isLoggedIn && reservedIndices.includes(index) && horario.reservedby === user.name && (
                                    <button className="cancelar" onClick={() => handleCancelReservation(index)}>Cancelar reserva</button>
                            )}
                        </div>
                        {isLoggedIn && horario.reserved && (
                            <h2>Reserved by: {horario.reservedby}</h2>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LocationInfo;
