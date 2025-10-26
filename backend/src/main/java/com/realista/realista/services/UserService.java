package com.realista.realista.services;

import com.realista.realista.entities.User;
import com.realista.realista.repositories.UserRepository;
import com.realista.realista.requests.AlignUserRequest;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();  // SELECT * FROM users
    }

    public User findOrCreateUser(AlignUserRequest request) {
        return userRepository.findByGoogleId(request.getGoogleId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setGoogleId(request.getGoogleId());
                    newUser.setEmail(request.getEmail());
                    newUser.setName(request.getName());
                    newUser.setProfileImageUrl(request.getProfileImageUrl());
                    return userRepository.save(newUser);
                });
    }
}

