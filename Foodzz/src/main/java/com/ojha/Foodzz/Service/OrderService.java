package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.Order;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public  Order updateOrder(Long orderId,String orderStatus) throws  Exception;

    public  void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrders(Long userId) throws Exception;

    public List<Order> getRestaurantsOrder(Long restaurantId,String orderStatus)  throws Exception;

    public Order findOrderById(Long orderId) throws Exception;
}

