package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.Dto.RestaurantDto;
import com.ojha.Foodzz.model.Address;
import com.ojha.Foodzz.model.Restaurant;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.AddressRepository;
import com.ojha.Foodzz.repository.RestaurantRepository;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.RestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(RestaurantRequest req, User user) {
        Optional<Restaurant> existingRestaurant = restaurantRepository.findFirstByOwnerIdOrderByIdAsc(user.getId());
        if (existingRestaurant.isPresent()) {
            Restaurant restaurant = existingRestaurant.get();

            if (req.getAddress() != null) {
                Address address = addressRepository.save(req.getAddress());
                restaurant.setAddress(address);
            }
            if (req.getContactInformation() != null) {
                restaurant.setContactInformation(req.getContactInformation());
            }
            if (req.getCuisineType() != null) {
                restaurant.setCuisineType(req.getCuisineType());
            }
            if (req.getDescription() != null) {
                restaurant.setDescription(req.getDescription());
            }
            if (req.getImages() != null) {
                restaurant.setImages(req.getImages());
            }
            if (req.getName() != null) {
                restaurant.setName(req.getName());
            }
            if (req.getOpeningHours() != null) {
                restaurant.setOpeningHour(req.getOpeningHours());
            }

            return restaurantRepository.save(restaurant);
        }

        Address address = addressRepository.save(req.getAddress() == null ? new Address() : req.getAddress());
        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHour(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, RestaurantRequest updatedRestaurant) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        if(updatedRestaurant.getCuisineType()!=null){
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }
        if(updatedRestaurant.getDescription()!=null){
            restaurant.setDescription(updatedRestaurant.getDescription());
        }
        if(updatedRestaurant.getName()!=null){
            restaurant.setName(updatedRestaurant.getName());
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);

    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt =restaurantRepository.findById(id);

        if(opt.isEmpty()){
            throw  new Exception("Restaurant not found with id" + id);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {

        return restaurantRepository.findFirstByOwnerIdOrderByIdAsc(userId)
                .orElseThrow(() -> new Exception("restaurant not found with owner id" + userId));
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavorites();
        for(RestaurantDto favorite : favorites){
            if(favorite.getId().equals(restaurantId)){
                isFavorited = true;
                break;
            }
        }

        if(isFavorited){
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        }
        else{
            favorites.add(dto);
        }
        userRepository.save(user);
        return  dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
