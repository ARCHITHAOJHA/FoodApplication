package com.ojha.Foodzz.response;

import com.ojha.Foodzz.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;

    private String message;

    private USER_ROLE role;

}
