package com.ojha.Foodzz.controller;


import com.ojha.Foodzz.Service.RestaurantService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.RestaurantRequest;
import com.ojha.Foodzz.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;


    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(
        @RequestBody RestaurantRequest req,
        @RequestHeader ("Authorization") String jwt
    ) throws Exception {
        User user = getUserFromJwt(jwt);

        Restaurant restaurant = restaurantService.createRestaurant(req,user);
        return  new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody RestaurantRequest req,
            @RequestHeader ("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        Restaurant restaurant = restaurantService.updateRestaurant(id,req);
        return  new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(
            @RequestHeader ("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        restaurantService.deleteRestaurant(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("restaurant deleted successfully");
        return  new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader ("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception {
        Restaurant restaurant=restaurantService.updateRestaurantStatus(id);
        return  new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader ("Authorization") String jwt
    ) throws Exception {
        User user = getUserFromJwt(jwt);

        Restaurant restaurant=restaurantService.getRestaurantByUserId(user.getId());
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
