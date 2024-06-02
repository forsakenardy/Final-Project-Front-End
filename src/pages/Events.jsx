import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import "../styles/events.css";

function Events({ events }) {
    const { isLoggedIn } = useContext(AuthContext);

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
                            <button>Apuntarse</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
