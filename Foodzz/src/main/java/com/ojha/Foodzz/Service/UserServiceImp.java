package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.config.JwtProvider;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(email).orElse(null);
        if(user==null){
            throw new Exception("user not found");
        }
        return user;
    }
}
