package com.realista.realista;

import com.realista.realista.entities.Apartment;
import com.realista.realista.entities.Review;
import com.realista.realista.entities.User;
import com.realista.realista.requests.AlignUserRequest;
import com.realista.realista.requests.CreateReviewRequest;
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

    @PostMapping("/api/apartments")
    public ResponseEntity<Apartment> createApartment(@RequestBody SearchAddressRequest request) {
        // Check if apartment already exists
        Optional<Apartment> existingApartment = apartmentService.findApartment(
            request.getProvincia(),
            request.getAyuntamiento(),
            request.getCalle(),
            request.getNumero(),
            request.getPiso(),
            request.getPuerta()
        );

        if (existingApartment.isPresent()) {
            // Return existing apartment if it already exists
            return ResponseEntity.ok(existingApartment.get());
        }

        // Create new apartment
        Apartment newApartment = new Apartment();
        newApartment.setProvincia(request.getProvincia());
        newApartment.setAyuntamiento(request.getAyuntamiento());
        newApartment.setCalle(request.getCalle());
        newApartment.setNumero(request.getNumero());
        newApartment.setPiso(request.getPiso());
        newApartment.setPuerta(request.getPuerta());

        Apartment savedApartment = apartmentService.createApartment(newApartment);
        return ResponseEntity.ok(savedApartment);
    }

    @PostMapping("/api/reviews")
    public ResponseEntity<Review> createReview(@RequestBody CreateReviewRequest request) {
        // Validate required fields
        if (request.getUserId() == null || request.getApartmentId() == null || 
            request.getRating() == null || request.getContent() == null || request.getContent().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Create new review
        Review newReview = new Review();
        newReview.setUserId(request.getUserId());
        newReview.setApartmentId(request.getApartmentId());
        newReview.setRating(request.getRating());
        newReview.setContent(request.getContent());
        newReview.setTitle(request.getTitle());

        Review savedReview = reviewService.createReview(newReview);

        // Update apartment's average rating and review count
        Optional<Apartment> apartmentOpt = apartmentService.findById(request.getApartmentId());
        if (apartmentOpt.isPresent()) {
            Apartment apartment = apartmentOpt.get();
            List<Review> allReviews = reviewService.getReviewsByApartmentId(request.getApartmentId());
            
            // Calculate new average rating
            double totalRating = 0;
            for (Review review : allReviews) {
                totalRating += review.getRating();
            }
            double averageRating = totalRating / allReviews.size();
            
            apartment.setAverageRating(averageRating);
            apartment.setReviewCount(allReviews.size());
            apartmentService.updateApartment(apartment);
        }

        return ResponseEntity.ok(savedReview);
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