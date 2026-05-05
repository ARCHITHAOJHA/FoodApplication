package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    private User getUserFromJwt(String jwt) throws Exception {

        // ✅ REMOVE "Bearer "
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return userRepository
                .findFirstByEmailIgnoreCaseOrderByIdAsc(email)
                .orElseThrow(() -> new Exception("user not found"));
    }
}