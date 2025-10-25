package com.realista.realista;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/hello")
    public String hello() {
        return "hello world!";
    }

    @PostMapping("/api/alignUser")
    public void alignUser(AlignUserRequest body){

    }
/*
Perfect! You already have Spring Data JPA set up. Here's the modern, industry-standard way:

1. Create User Entity (User.java):

package com.realista.realista;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String googleId;

    @Column(nullable = false)
    private String email;

    private String name;
    private String profileImageUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

     @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

2. Create Repository (UserRepository.java):

package com.realista.realista;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByEmail(String email);
}

3. Create Service (UserService.java):

package com.realista.realista;

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

4. Update Controller:

package com.realista.realista;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class Controller {

    private final UserService userService;

    public Controller(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello world!";
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();  // SELECT * FROM users
    }

    @PostMapping("/api/alignUser")
    public User alignUser(@RequestBody AlignUserRequest request) {
        return userService.findOrCreateUser(request);
    }
}

This follows the 3-layer architecture:

• Controller: Handles HTTP requests
• Service: Business logic
• Repository: Database access

Spring Data JPA auto-generates SQL from method names like findByGoogleId() - no manual queries needed.
 */
}