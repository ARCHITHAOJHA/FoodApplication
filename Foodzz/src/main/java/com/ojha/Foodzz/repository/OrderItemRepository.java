package com.ojha.Foodzz.repository;

import com.ojha.Foodzz.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {


}
