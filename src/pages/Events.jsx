import "../styles/events.css"

function Events({ events }) {
    return (
        <div className="events">
            {
                events.map((event) => {
                    return (
                        <div className="event-card" key={event._id}>
                            <div>
                                <div className="date"><p>{event.date} at {event.time}</p></div>
                                <h2 className="event-name">{event.name}</h2>
                            </div>
                            <div>
                                <p>{event.description}</p>
                                <p>Location: {event.location}</p>
                                <p>ELO Range: {event.elo_range.min} - {event.elo_range.max}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Events;