package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Event;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.repository.EventRepository;
import com.ojha.Foodzz.request.EventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImp implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event createEvent(EventRequest req, Restaurant restaurant) {

        Event event = new Event();
        event.setEventName(req.getEventName());
        event.setImageUrl(req.getImageUrl());
        event.setLocation(req.getLocation());
        event.setRestaurant(restaurant);

        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> getEventsByRestaurant(Long restaurantId) {
        return eventRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

}