package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Event;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.request.EventRequest;

import java.util.List;

public interface EventService {

    Event createEvent(EventRequest req, Restaurant restaurant);

    List<Event> getAllEvents();

    List<Event> getEventsByRestaurant(Long restaurantId);

    void deleteEvent(Long eventId);
}