package com.ojha.Foodzz.controller;


import com.ojha.Foodzz.Service.FoodService;
import com.ojha.Foodzz.Service.RestaurantService;
import com.ojha.Foodzz.model.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;


    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFood(
            @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {
        List<Food> foods = foodService.getAllFood();
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {
        Food food = foodService.findFoodById(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String name,
            @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {
        String searchTerm = keyword != null && !keyword.isBlank() ? keyword : name;
        List<Food> foods = (searchTerm == null || searchTerm.isBlank())
                ? List.of()
                : foodService.searchFood(searchTerm.trim());
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam(defaultValue = "false") boolean vegetarian,
            @RequestParam(defaultValue = "false") boolean seasonal,
            @RequestParam(defaultValue = "false") boolean nonveg,
            @RequestParam(required = false) String food_category,
            @PathVariable Long restaurantId,
            @RequestHeader(value = "Authorization", required = false) String jwt) throws Exception {


        List<Food> foods = foodService.getRestaurantFood(restaurantId,vegetarian,nonveg,seasonal,food_category);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
