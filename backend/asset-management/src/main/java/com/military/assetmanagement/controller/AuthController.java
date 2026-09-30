package com.military.assetmanagement.controller;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.military.assetmanagement.entity.User;
import com.military.assetmanagement.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                    )
                );

        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow();

        return Map.of(
            "username", user.getUsername(),
            "role", user.getRole(),
            "message", "Login successful"
        );
    }

    public record LoginRequest(String username, String password) {
    }
}