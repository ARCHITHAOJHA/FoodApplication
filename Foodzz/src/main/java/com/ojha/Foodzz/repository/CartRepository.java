package com.ojha.Foodzz.repository;

import com.ojha.Foodzz.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {

    Optional<Cart> findFirstByCustomerIdOrderByIdAsc(Long userId);


}
