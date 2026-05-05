package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.Service.OrderService;
import com.ojha.Foodzz.Service.PaymentService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.CartItem;
import com.ojha.Foodzz.model.Order;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.AddCartItemRequest;
import com.ojha.Foodzz.request.OrderRequest;
import com.ojha.Foodzz.response.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        Order order = orderService.createOrder(req,user);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        List<Order> orders = orderService.getUsersOrders(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        Order order = orderService.findOrderById(id);
        
        // Verify user owns this order
        if (!order.getCustomer().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        
        return new ResponseEntity<>(order, HttpStatus.OK);
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
