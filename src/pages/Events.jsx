import React, { useState, useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/events.css";

function Events({ events }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [signedUpEventIds, setSignedUpEventIds] = useState([]); // Define el estado

    const handleSignUpClick = (eventId) => {
        if (!signedUpEventIds.includes(eventId)) { // Evitar duplicados
            setSignedUpEventIds([...signedUpEventIds, eventId]); // Añadir el ID del evento al array
        }
    };

    return (
        <div className="events">
            {events.map((event) => (
                <div className="event-card" key={event._id}>
                    <div>
                        <div className="date"><p>{event.date} at {event.time}</p></div>
                        <h2 className="event-name">{event.name}</h2>
                    </div>
                    <div>
                        <p>{event.description}</p>
                        <p>Location: {event.location}</p>
                        <p>ELO Range: {event.elo_range.min} - {event.elo_range.max}</p>
                        {isLoggedIn && (
                            <button onClick={() => handleSignUpClick(event._id)}>Apuntarse</button> // Añadir el onClick con event ID
                        )}
                        {signedUpEventIds.includes(event._id) && <h1>You have signed up</h1>} // Renderizado condicional
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
