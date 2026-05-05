package com.ojha.Foodzz.controller;


import com.ojha.Foodzz.Service.CategoryService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Category;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        Category createdCategory = categoryService.createCategory(category.getName(),user.getId());
        return  new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<List<Category>> getRestaurantCategory(
                                                   @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        List<Category> categories = categoryService.findCategoryByRestaurant(user.getId());
        return  new ResponseEntity<>(categories, HttpStatus.OK);
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
