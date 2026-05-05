package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory(String name,Long userId) throws Exception;

    public List<Category> findCategoryByRestaurant(Long id) throws Exception;

    public Category findCategoryBy(Long id) throws Exception;
}
