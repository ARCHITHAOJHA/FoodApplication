package com.ojha.Foodzz.request;

import lombok.Data;

@Data
public class SignupRequest {

    private String fullname;
    private String email;
    private String password;
    private String role;
}

