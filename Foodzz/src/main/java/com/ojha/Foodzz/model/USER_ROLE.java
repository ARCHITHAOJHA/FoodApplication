package com.ojha.Foodzz.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Locale;

public enum USER_ROLE {

    ROLE_CUSTOMER,


    ROLE_RESTAURANT_OWNER,

    ROLE_ADMIN

    ;

    @JsonCreator
    public static USER_ROLE fromValue(String value) {
        if (value == null || value.isBlank()) {
            return ROLE_CUSTOMER;
        }

        String normalized = value.trim().toUpperCase(Locale.ROOT)
                .replace('-', '_')
                .replace(' ', '_');

        if (!normalized.startsWith("ROLE_")) {
            normalized = "ROLE_" + normalized;
        }

        return USER_ROLE.valueOf(normalized);
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}
