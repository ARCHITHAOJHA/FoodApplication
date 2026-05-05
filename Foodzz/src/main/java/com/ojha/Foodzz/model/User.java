package com.ojha.Foodzz.model;

import com.ojha.Foodzz.Dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonAlias({"fullName", "name"})
    private String fullname;


      @Column(unique = true, nullable = false)
      private String email;

    @Column(nullable = false, length = 40)
    @Convert(converter = com.ojha.Foodzz.model.UserRoleConverter.class)
    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "customer")
    private List<Order>  orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto> favorites = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    public void setPassword(String password) {
        this.password = password;
    }


}
