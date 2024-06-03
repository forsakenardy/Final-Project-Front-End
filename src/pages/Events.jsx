import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/events.css";

const API_URL = import.meta.env.VITE_API_URL;

function Events({ events, setEvents }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const userId = user ? user._id : null;
    const userName = user ? user.name : null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUpClick = async (eventId) => {
        if (!events.find(event => event._id === eventId).participants.some(participant => participant.userId === userId)) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/events/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ eventId, userId, userName })
                });

                if (!response.ok) {
                    throw new Error("Error al apuntarse al evento");
                }

                // Obtener la lista de eventos actualizada del servidor después de la inscripción
                const updatedEvents = await fetchEvents();
                setEvents(updatedEvents);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancelSignUpClick = async (eventId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/events/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ eventId, userId })
            });

            if (!response.ok) {
                throw new Error("Error al cancelar la inscripción del evento");
            }

            // Obtener la lista de eventos actualizada del servidor después de cancelar la inscripción
            const updatedEvents = await fetchEvents();
            setEvents(updatedEvents);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEvents = async () => {
        const response = await fetch(`${API_URL}/events`);
        if (!response.ok) {
            throw new Error("Error al obtener los eventos");
        }
        const data = await response.json();
        return data;
    };

    return (
        <div className="events">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
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
                        <p>Participants</p>
                        <ul>
                            {event.participants.map((participant, index) => (
                                <li key={index}>{participant.userName}</li>
                            ))}
                        </ul>
                        {isLoggedIn && (
                            !event.participants.some(participant => participant.userId === userId) ? (
                                <button onClick={() => handleSignUpClick(event._id)}>Join</button>
                            ) : (
                                <>
                                    <h1>You have signed up</h1>
                                    <button onClick={() => handleCancelSignUpClick(event._id)}>Cancel</button>
                                </>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Events;
