package com.ojha.Foodzz.controller;

import com.ojha.Foodzz.Service.CustomerUserDetailsService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Cart;
import com.ojha.Foodzz.model.USER_ROLE;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.CartRepository;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.LoginRequest;
import com.ojha.Foodzz.response.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler(@RequestBody Map<String, Object> body) {
        try {
            String fullName = readString(body, "fullname", "fullName", "name");
            String email = normalizeEmail(readString(body, "email"));
            String password = readString(body, "password");
            String requestedRole = readString(body, "role");

            if(email == null || email.isBlank()){
                return ResponseEntity.badRequest().body(new java.util.HashMap<String, String>() {{
                    put("error", "Email is required");
                }});
            }
            
            if(password == null || password.isBlank()){
                return ResponseEntity.badRequest().body(new java.util.HashMap<String, String>() {{
                    put("error", "Password is required");
                }});
            }
            
            if(fullName == null || fullName.isBlank()){
                return ResponseEntity.badRequest().body(error("Full name is required"));
            }

            if(userRepository.existsByEmailIgnoreCase(email)){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(error("Email is already used with another account"));
            }

            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullname(fullName);
            createdUser.setRole(USER_ROLE.fromValue(requestedRole));
            createdUser.setPassword(passwordEncoder.encode(password));

            User savedUser = userRepository.save(createdUser);

            Cart cart = new Cart();
            cart.setCustomer(savedUser);
            cartRepository.save(cart);

            UserDetails userDetails = customerUserDetailsService.loadUserByUsername(savedUser.getEmail());
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtProvider.generateToken(authentication);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setJwt(jwt);
            authResponse.setMessage("Register success");
            authResponse.setRole(savedUser.getRole());

            return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    error("Unable to create account. Email may already exist or role value is invalid for current DB schema")
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(error("Invalid role. Use CUSTOMER, RESTAURANT_OWNER, or ADMIN"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(safeMessage(e, "Failed to create user")));
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest req) {
        try {
            String username = normalizeEmail(req.getEmail());
            String password = req.getPassword();
            
            if (username == null || username.isBlank()) {
                return ResponseEntity.badRequest().body(new java.util.HashMap<String, String>() {{
                    put("error", "Email is required");
                }});
            }
            
            if (password == null || password.isBlank()) {
                return ResponseEntity.badRequest().body(new java.util.HashMap<String, String>() {{
                    put("error", "Password is required");
                }});
            }

            Authentication authentication = authenticate(username, password);

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.isEmpty() ? USER_ROLE.ROLE_CUSTOMER.name() : authorities.iterator().next().getAuthority();

            String jwt = jwtProvider.generateToken(authentication);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setJwt(jwt);
            authResponse.setMessage("Login success");
            authResponse.setRole(USER_ROLE.fromValue(role));

            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    error("Invalid email or password")
            );
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error("Invalid email or password"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(error("Invalid request"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(safeMessage(e, "Failed to sign in")));
        }
    }

    private Authentication authenticate(String username, String password) throws BadCredentialsException {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);
        
        String storedPassword = userDetails.getPassword();
        boolean matches = passwordEncoder.matches(password, storedPassword);

        if (!matches) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    private String readString(Map<String, Object> body, String... keys) {
        for (String key : keys) {
            Object value = body.get(key);
            if (value != null) {
                return String.valueOf(value).trim();
            }
        }
        return null;
    }

    private java.util.Map<String, String> error(String message) {
        java.util.Map<String, String> body = new java.util.HashMap<>();
        body.put("error", message);
        return body;
    }

    private String safeMessage(Exception e, String fallback) {
        return (e.getMessage() == null || e.getMessage().isBlank()) ? fallback : e.getMessage();
    }

}
