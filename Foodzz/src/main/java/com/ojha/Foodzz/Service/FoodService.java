package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Category;
import com.ojha.Foodzz.model.Food;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.request.FoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(FoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantFood(Long restautrantId,
                                        boolean isVegetarian,
                                        boolean isNonveg,
                                        boolean isSeasonal,
                                        String foodCategory);

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

    public List<Food> getAllFood();
}
