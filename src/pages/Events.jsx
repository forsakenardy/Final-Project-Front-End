import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/events.css";

const API_URL = import.meta.env.VITE_API_URL

function Events({ events }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const userId = user ? user._id : null;
    const userName = user ? user.name : null; 

    const [signedUpEventIds, setSignedUpEventIds] = useState(() => {
        const savedIds = localStorage.getItem(`signedUpEventIds_${userId}`);
        return savedIds ? JSON.parse(savedIds) : [];
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`signedUpEventIds_${userId}`, JSON.stringify(signedUpEventIds));
        }
    }, [signedUpEventIds, userId]);

    const handleSignUpClick = async (eventId) => {
        if (!signedUpEventIds.includes(eventId)) {
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

                setSignedUpEventIds([...signedUpEventIds, eventId]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancelSignUpClick = async (eventId) => {
        const updatedEventIds = signedUpEventIds.filter(id => id !== eventId);
        setSignedUpEventIds(updatedEventIds);
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
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!userId) {
        return <div>Loading...</div>;
    }

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
                        {isLoggedIn && (
                            !signedUpEventIds.includes(event._id) ? (
                                <div>
                                    <button onClick={() => handleSignUpClick(event._id)}>Join</button>
                                </div>
                            ) : (
                                <div>
                                    <h1>You have signed up</h1>
                                    <button onClick={() => handleCancelSignUpClick(event._id)}>Cancel</button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
