package com.realista.realista;

import com.realista.realista.entities.Apartment;
import com.realista.realista.entities.Review;
import com.realista.realista.entities.User;
import com.realista.realista.requests.AlignUserRequest;
import com.realista.realista.requests.SearchAddressRequest;
import com.realista.realista.responses.ApartmentDetailsResponse;
import com.realista.realista.services.ApartmentService;
import com.realista.realista.services.ReviewService;
import com.realista.realista.services.UserService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class Controller {

    private final UserService userService;
    private final ApartmentService apartmentService;
    private final ReviewService reviewService;

    public Controller(UserService userService, ApartmentService apartmentService, ReviewService reviewService) {
        this.userService = userService;
        this.apartmentService = apartmentService;
        this.reviewService = reviewService;
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

    @PostMapping("/api/searchAddress")
    public ResponseEntity<Apartment> searchAddress(@RequestBody SearchAddressRequest request) {
        Optional<Apartment> existingApartment = apartmentService.findApartment(
            request.getProvincia(),
            request.getAyuntamiento(),
            request.getCalle(),
            request.getNumero(),
            request.getPiso(),
            request.getPuerta()
        );

        if (existingApartment.isPresent()) {
            return ResponseEntity.ok(existingApartment.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/api/apartments/{id}")
    public ResponseEntity<ApartmentDetailsResponse> getApartmentById(@PathVariable Long id) {
        Optional<ApartmentDetailsResponse> apartmentDetails = apartmentService.getApartmentDetails(id);
        
        if (apartmentDetails.isPresent()) {
            return ResponseEntity.ok(apartmentDetails.get());
        }
        
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/api/apartments/{id}/reviews")
    public List<Review> getApartmentReviews(@PathVariable Long id) {
        return reviewService.getReviewsByApartmentId(id);
    }
/*
Perfect! You already have Spring Data JPA set up. Here's the modern, industry-standard way:
1. Create Entity (User.java)
2. Create Repository (UserRepository.java)
3. Create Service (UserService.java):
4. Update Controller:

This follows the 3-layer architecture:
• Controller: Handles HTTP requests
• Service: Business logic
• Repository: Database access

Spring Data JPA auto-generates SQL from method names like findByGoogleId() - no manual queries needed.
 */
}