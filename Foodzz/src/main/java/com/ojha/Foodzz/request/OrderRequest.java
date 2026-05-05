package com.ojha.Foodzz.request;

import com.ojha.Foodzz.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;
}
