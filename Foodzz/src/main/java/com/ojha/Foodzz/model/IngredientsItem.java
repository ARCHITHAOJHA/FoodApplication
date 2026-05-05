package com.ojha.Foodzz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class IngredientsItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @ManyToOne
    private IngredientCategory category;

    @ManyToOne
    private  Restaurant restaurant;

    private boolean instock = true;


}
