package com.ojha.Foodzz.Service;

import com.ojha.Foodzz.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
