package com.military.assetmanagement.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.military.assetmanagement.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/api/test")
                .permitAll()

                .requestMatchers("/api/auth/login")
                .permitAll()

                .requestMatchers("/api/users/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/audit-logs/**")
                .hasAnyRole("ADMIN", "BASE_COMMANDER")

                .requestMatchers(HttpMethod.GET, "/api/bases")
                .hasAnyRole("ADMIN", "BASE_COMMANDER", "LOGISTICS_OFFICER")

                .requestMatchers(HttpMethod.POST, "/api/bases")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/bases/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/equipment/**")
                .hasAnyRole("ADMIN", "BASE_COMMANDER", "LOGISTICS_OFFICER")

                .requestMatchers(HttpMethod.POST, "/api/equipment")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/equipment/**")
                .hasRole("ADMIN")

                .requestMatchers("/api/purchases/**")
                .hasAnyRole("ADMIN", "LOGISTICS_OFFICER")

                .requestMatchers("/api/transfers/**")
                .hasAnyRole("ADMIN", "LOGISTICS_OFFICER")

                .requestMatchers("/api/assignments/**")
                .hasAnyRole("ADMIN", "BASE_COMMANDER")

                .requestMatchers("/api/expenditures/**")
                .hasAnyRole("ADMIN", "BASE_COMMANDER")

                .requestMatchers(HttpMethod.GET, "/api/dashboard/**")
                .hasAnyRole("ADMIN", "BASE_COMMANDER", "LOGISTICS_OFFICER")

                .anyRequest()
                .authenticated()
            )
            .httpBasic(httpBasic -> {});

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
            List.of("Authorization", "Content-Type")
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.security.authentication.AuthenticationManager authenticationManager(
            HttpSecurity http) throws Exception {

        AuthenticationManagerBuilder builder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        builder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());

        return builder.build();
    }
}