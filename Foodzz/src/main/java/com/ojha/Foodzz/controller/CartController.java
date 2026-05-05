package com.ojha.Foodzz.controller;


import com.ojha.Foodzz.Service.CartService;
import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Cart;
import com.ojha.Foodzz.model.CartItem;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.request.AddCartItemRequest;
import com.ojha.Foodzz.request.UpdateCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {

        CartItem cartItem = cartService.addItemToCart(req,jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartItemRequest req,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {

        CartItem cartItem = cartService.updateCartItemQuantity(req.getCartItemId(),req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart/item/{id}")
    public ResponseEntity<Cart> removeCartItem(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        Cart cart = cartService.removeItemFromCart(id, jwt);
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @DeleteMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(
             @RequestHeader("Authorization") String jwt) throws Exception {
        User user = getUserFromJwt(jwt);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart
            (@RequestHeader("Authorization") String jwt) throws Exception {
        User user = getUserFromJwt(jwt);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);

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
