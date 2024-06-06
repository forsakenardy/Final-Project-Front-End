import React, { useState, useContext } from "react";
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
            {loading && <img className="ball2" src="https://i.ibb.co/WKTHyR0/white-ball.png" alt="" />}
            {error && <p>{error}</p>}
            {events.map((event) => (
                <div className="event-card" key={event._id}>
                    <div className="event-class-top">
                        <h2 className="event-name">{event.name}</h2>
                        <p>{event.description}</p>

                    </div>
                    <div className="locations-extra">
                        <div className="locations-rackets">
                            <h4>Location</h4>
                            <h3>{event.location}</h3>
                            {isLoggedIn && (
                                !event.participants.some(participant => participant.userId === userId) ? (
                                    <div className="joined-event more-margin">
                                        <button className="cancel" onClick={() => handleSignUpClick(event._id)}>Join</button>
                                    </div>

                                ) : (
                                    <div className="joined-event">
                                        <h6>You are signed up!</h6>
                                        <button className="reserve" onClick={() => handleCancelSignUpClick(event._id)}>Cancel</button>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="locations-rackets">
                            <h4>ELO Range</h4>
                            <h3>{event.elo_range.min} - {event.elo_range.max}</h3>
                            <h4>Participants: </h4>
                            <div className="event-participants">
                                {event.participants.map((participant, index) => (
                                    <h3 key={index}>{`${participant.userName}-`}</h3>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="date">
                        <h6>when</h6>
                        <p>{event.date} / {event.time}</p>
                    </div>


                </div>
            ))}
        </div>
    );

}

export default Events;
