import React, { useEffect, useState } from "react";
import axios from "axios";
import { EventCard } from "./EventCard";

export const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const res = await axios.get("http://localhost:8080/api/events");
        setEvents(res.data);
    };

    const handleDelete = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="mt-5 px-5 flex flex-wrap gap-5">

            {events.map(event => (
                <EventCard 
                    key={event.id} 
                    event={event} 
                    onDelete={handleDelete}
                />
            ))}

        </div>
    );
};