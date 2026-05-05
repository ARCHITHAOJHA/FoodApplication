package com.ojha.Foodzz.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class UserRoleConverter implements AttributeConverter<USER_ROLE, String> {

    @Override
    public String convertToDatabaseColumn(USER_ROLE attribute) {
        USER_ROLE role = attribute == null ? USER_ROLE.ROLE_CUSTOMER : attribute;
        String name = role.name();
        return name.startsWith("ROLE_") ? name.substring(5) : name;
    }

    @Override
    public USER_ROLE convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return USER_ROLE.ROLE_CUSTOMER;
        }
        return USER_ROLE.fromValue(dbData);
    }
}

