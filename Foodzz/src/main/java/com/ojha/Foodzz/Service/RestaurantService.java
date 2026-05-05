package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.Dto.RestaurantDto;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.request.RestaurantRequest;

import java.util.List;

public interface RestaurantService {

    public Restaurant createRestaurant(RestaurantRequest req, User user);

    public Restaurant updateRestaurant(Long restaurantId,RestaurantRequest updatedRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurant();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    public Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDto addToFavorites(Long restaurantId,User user)throws Exception;

    public Restaurant updateRestaurantStatus(Long id) throws Exception;
}
