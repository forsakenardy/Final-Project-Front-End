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

                }
            }
        } catch (error) {

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

            }
        } catch (error) {

        }
    };

    if (!locationCard) {
        return <div><img className="ball2" src="https://i.ibb.co/WKTHyR0/white-ball.png" alt="" /></div>;
    }

    return (
        <div key={locationCard._id} className="location-info">
            <img className="locationinfo-image" src={locationCard.image} alt="location-image" />
            <h1 className="location-name1">{locationCard.name}</h1>
            <p className="location-description">{locationCard.description}</p>
            <div className="locations-extra">
                <div className="locations-rackets">
                    <h4 className="blue-color">Location</h4>
                    <h3 className="location-place">{locationCard.place}</h3>
                    <h4 className="blue-color">Rackets</h4>
                    <h3 className="location-rackets">{locationCard.rackets ? "Available" : "Not Available"}</h3>
                </div>
                <div className="locations-rackets">
                    <h4 className="blue-color">Type of Net</h4>
                    <h3 className="location-net">{locationCard.net}</h3>
                    <h4 className="blue-color">Extra</h4>
                    <h3 className="location-barServise">{locationCard.barService ? "Bar Service" : ""}</h3>
                </div>
            </div>
            <div>
                <h3 className="timetable blue-color">Timetable</h3>
                {locationCard.horarios.map((horario, index) => (
                    <div className="li" key={index}>
                        <div className="horario">
                            <div className="timetable-left">
                                <h3 className="list">From: {horario.horaInicio} to: {horario.horaFin}</h3>
                                {isLoggedIn && horario.reserved && (
                                    <h6 className="blue-color">Reserved by: {horario.reservedby}</h6>
                                )}
                            </div>
                        </div>

                        {isLoggedIn && reservedIndices.includes(index) && horario.reservedby === user.name && (
                            <button className="cancel" onClick={() => handleCancelReservation(index)}>Cancel booking</button>
                        )}
                        {isLoggedIn && !horario.reserved && (
                            <button className="reserve" onClick={() => handleReserveClick(index)}>Book</button>
                        )}
                    </div>
                ))}
                <button className="go-back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
}

export default LocationInfo;
