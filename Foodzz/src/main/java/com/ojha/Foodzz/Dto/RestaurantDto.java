package com.ojha.Foodzz.Dto;


import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDto {

    private String title;

    @Transient
    private List<String> images;

    private String description;

    private Long id;
}
