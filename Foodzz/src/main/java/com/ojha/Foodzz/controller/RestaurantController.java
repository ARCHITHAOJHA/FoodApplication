package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.Dto.RestaurantDto;
import com.ojha.Foodzz.Service.RestaurantService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestParam String keyword
    ) {
        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);
        return  new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant() {
        List<Restaurant> restaurant = restaurantService.getAllRestaurant();
        return  new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @PathVariable Long id
    ) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return  new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        User user = getUserFromJwt(jwt);

        RestaurantDto restaurant = restaurantService.addToFavorites(id,user);
        return  new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    private User getUserFromJwt(String jwt) throws Exception {
        // ✅ REMOVE "Bearer " prefix
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(email)
                .orElseThrow(() -> new Exception("user not found"));
    }


}
