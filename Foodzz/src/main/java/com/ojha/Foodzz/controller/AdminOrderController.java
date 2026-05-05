package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.Service.OrderService;
import com.ojha.Foodzz.model.Order;
import com.ojha.Foodzz.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;


    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(
            @PathVariable Long id,
            @RequestParam(required = false) String order_status,
            @RequestHeader("Authorization") String jwt) throws Exception {

        List<Order> orders = orderService.getRestaurantsOrder(id,order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);

    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody java.util.Map<String, String> request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        String orderStatus = request.get("orderStatus");
        Order order = orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);

    }

}
