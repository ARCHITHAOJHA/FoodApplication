package com.ojha.Foodzz.request;


import com.ojha.Foodzz.model.Category;
import com.ojha.Foodzz.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class FoodRequest {

    private String name;
    private String description;
    private Long price;

    private Category category;
    private List<String> images;

    private Long restaurantId;
    private boolean vegetarian;
    private boolean seasional;
    private List<IngredientsItem> ingredients;

}
