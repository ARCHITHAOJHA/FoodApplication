package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.Cart;
import com.ojha.Foodzz.model.CartItem;
import com.ojha.Foodzz.model.Food;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import com.ojha.Foodzz.repository.CartItemRepository;
import com.ojha.Foodzz.repository.CartRepository;
import com.ojha.Foodzz.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Cart cart = findOrCreateCart(user);

        for(CartItem cartItem : cart.getItem()){
            if(cartItem.getFood().equals(food)){
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(),newQuantity);
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);
        cart.getItem().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if(cartItemOptional.isEmpty()){
            throw  new Exception("Cart item not found");
        }
        CartItem item =cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice()*quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = getUserFromJwt(jwt);
        Cart cart = findOrCreateCart(user);
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if(cartItemOptional.isEmpty()){
            throw  new Exception("Cart item not found");
        }
        CartItem item =cartItemOptional.get();
        cart.getItem().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0L;

        for(CartItem cartItem : cart.getItem()){
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> optionalCart = cartRepository.findById(id);
        if(optionalCart.isEmpty()){
            throw new Exception("Cart not found with id" + id);
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("user not found"));
        Cart cart = findOrCreateCart(user);
        cart.setTotal(calculateCartTotals(cart));
        return  cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

        Cart cart = findCartByUserId(userId);

        cart.getItem().clear();
        return  cartRepository.save(cart);
    }

    private User getUserFromJwt(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(email)
                .orElseThrow(() -> new Exception("user not found"));
    }

    private Cart findOrCreateCart(User user) {
        return cartRepository.findFirstByCustomerIdOrderByIdAsc(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCustomer(user);
                    newCart.setTotal(0L);
                    return cartRepository.save(newCart);
                });
    }
}
