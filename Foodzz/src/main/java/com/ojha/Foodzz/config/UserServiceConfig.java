package com.ojha.Foodzz.config;

import com.ojha.Foodzz.Service.UserService;
import com.ojha.Foodzz.model.User;
import com.ojha.Foodzz.repository.UserRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserServiceConfig {

	@Bean
	@ConditionalOnMissingBean(UserService.class)
	public UserService userService(UserRepository userRepository, JwtProvider jwtProvider) {
		return new UserService() {
			@Override
			public User findUserByJwtToken(String jwt) throws Exception {
				String email = jwtProvider.getEmailFromJwtToken(jwt);
				return findUserByEmail(email);
			}

			@Override
			public User findUserByEmail(String email) throws Exception {
				return userRepository.findFirstByEmailIgnoreCaseOrderByIdAsc(email)
						.orElseThrow(() -> new Exception("user not found"));
			}
		};
	}
}

