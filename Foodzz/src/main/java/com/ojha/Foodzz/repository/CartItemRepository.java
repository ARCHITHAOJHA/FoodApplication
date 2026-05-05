package com.ojha.Foodzz.repository;

import com.ojha.Foodzz.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
