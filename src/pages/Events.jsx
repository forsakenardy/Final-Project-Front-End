import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/events.css";

function Events({ events }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const userId = user ? user._id : null;

    const [signedUpEventIds, setSignedUpEventIds] = useState(() => {
        const savedIds = localStorage.getItem(`signedUpEventIds_${userId}`);
        return savedIds ? JSON.parse(savedIds) : [];
    });

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`signedUpEventIds_${userId}`, JSON.stringify(signedUpEventIds));
        }
    }, [signedUpEventIds, userId]);

    const handleSignUpClick = (eventId) => {
        if (!signedUpEventIds.includes(eventId)) {
            setSignedUpEventIds([...signedUpEventIds, eventId]);
        }
    };

    if (!userId) {
        return <div>Loading...</div>;
    }

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
                            !signedUpEventIds.includes(event._id) ? (
                                <button onClick={() => handleSignUpClick(event._id)}>Join</button>
                            ) : (
                                <h1>You have signed up</h1>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
