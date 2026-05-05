package com.ojha.Foodzz.repository;

import com.ojha.Foodzz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<User> findFirstByEmailIgnoreCaseOrderByIdAsc(String email);


}
