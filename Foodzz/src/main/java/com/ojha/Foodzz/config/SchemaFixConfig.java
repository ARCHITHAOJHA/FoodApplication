package com.ojha.Foodzz.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;

@Configuration
public class SchemaFixConfig {

    @Bean
    CommandLineRunner ensureRoleColumnIsVarchar(JdbcTemplate jdbcTemplate, DataSource dataSource) {
        return args -> {
            try (java.sql.Connection connection = dataSource.getConnection()) {
                String url = connection.getMetaData().getURL();
                if (url == null || !url.toLowerCase().contains("mysql")) {
                    return;
                }
            }

            try {
                List<String> checks = jdbcTemplate.queryForList(
                        "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS " +
                                "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user' AND CONSTRAINT_TYPE = 'CHECK'",
                        String.class
                );

                for (String constraintName : checks) {
                    try {
                        jdbcTemplate.execute("ALTER TABLE `user` DROP CHECK `" + constraintName + "`");
                    } catch (Exception ignored) {
                        // Some MySQL versions use DROP CONSTRAINT instead of DROP CHECK.
                        try {
                            jdbcTemplate.execute("ALTER TABLE `user` DROP CONSTRAINT `" + constraintName + "`");
                        } catch (Exception ignoredToo) {
                            // non-fatal
                        }
                    }
                }

                // Keep role values compatible with enum constants and avoid legacy MySQL ENUM restrictions.
                jdbcTemplate.execute("ALTER TABLE `user` MODIFY COLUMN `role` VARCHAR(40) NOT NULL");
                jdbcTemplate.execute("UPDATE `user` SET `role`='CUSTOMER' WHERE `role` IN ('CUSTOMER', 'ROLE_CUSTOMER')");
                jdbcTemplate.execute("UPDATE `user` SET `role`='RESTAURANT_OWNER' WHERE `role` IN ('RESTAURANT_OWNER', 'ROLE_RESTAURANT_OWNER')");
                jdbcTemplate.execute("UPDATE `user` SET `role`='ADMIN' WHERE `role` IN ('ADMIN', 'ROLE_ADMIN')");
            } catch (Exception ignored) {
                // Non-fatal: app can still run even if DB user cannot alter schema.
            }
        };
    }
}

