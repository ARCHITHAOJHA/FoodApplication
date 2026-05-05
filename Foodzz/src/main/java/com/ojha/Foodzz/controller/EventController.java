package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.Service.EventService;
import com.ojha.Foodzz.Service.RestaurantService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Event;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.EventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    // ✅ CREATE EVENT
    @PostMapping
    public ResponseEntity<Event> createEvent(
            @RequestBody EventRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = getUserFromJwt(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());

        Event event = eventService.createEvent(req, restaurant);

        return ResponseEntity.ok(event);
    }

    // ✅ GET ALL EVENTS
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // ✅ GET EVENTS BY RESTAURANT
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<Event>> getEventsByRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventsByRestaurant(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted successfully");
    }

    // 🔐 JWT HELPER (same as your existing controllers)
    private User getUserFromJwt(String jwt) throws Exception {

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return userRepository
                .findFirstByEmailIgnoreCaseOrderByIdAsc(email)
                .orElseThrow(() -> new Exception("user not found"));
    }
}
