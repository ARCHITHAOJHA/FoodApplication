package com.ojha.Foodzz.repository;

import com.ojha.Foodzz.Service.IngredientsService;
import com.ojha.Foodzz.model.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientsCategoryRepository extends JpaRepository<IngredientCategory,Long> {

    List<IngredientCategory> findByRestaurantId(Long id);

}
