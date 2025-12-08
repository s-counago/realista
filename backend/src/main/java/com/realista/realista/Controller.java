package com.realista.realista;

import com.realista.realista.entities.*;
import com.realista.realista.requests.*;
import com.realista.realista.responses.ApartmentDetailsResponse;
import com.realista.realista.services.*;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(Controller.class);
    private final UserService userService;
    private final ApartmentService apartmentService;
    private final ReviewService reviewService;
    private final LandlordService landlordService;
    private final CredentialsService credentialsService;

    public Controller(UserService userService, ApartmentService apartmentService, ReviewService reviewService, LandlordService landlordService, CredentialsService credentialsService) {
        this.userService = userService;
        this.apartmentService = apartmentService;
        this.reviewService = reviewService;
        this.landlordService = landlordService;
        this.credentialsService = credentialsService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello world!";
    }

    @PostMapping("/api/registro")
    public ResponseEntity<Credentials> registerUser(@RequestBody RegisterRequest regReq){
        Optional<Credentials> existingCredentials = credentialsService.findByEmail(regReq.getEmail());
        if (existingCredentials.isPresent()){
            return ResponseEntity.status(409).build();
        }
        Credentials newCredentials = new Credentials();
        newCredentials.setEmail(regReq.getEmail());
        newCredentials.setHashedPassword(regReq.getPassword());
        credentialsService.registro(newCredentials);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/getCredential/{email}")
    public Optional<Credentials> getCredential(@PathVariable String email){
        return credentialsService.findByEmail(email);
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();  // SELECT * FROM users
    }

    @GetMapping("/api/users/{id}")
    public Optional<User> getUser(@PathVariable Long id){ return userService.getUserById(id);}

    @GetMapping("/api/users/google/{googleId}")
    public Optional<User> getUserByGoogleId(@PathVariable String googleId){
        return userService.getUserByGoogleId(googleId);
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

    @PostMapping("/api/landlord/searchLandlord")
    public ResponseEntity<Landlord> searchLandlord(@RequestBody SearchLandlordRequest landlord){
        Optional<Landlord> existingLandlord = landlordService.findByName(landlord.getName());
        if (existingLandlord.isPresent())
            return ResponseEntity.ok(existingLandlord.get());
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/api/landlords/{id}/reviews")
    public List<Review> getLandlordReviews(@PathVariable Long id){ return reviewService.getReviewsByLandlordId(id);}

    @PostMapping("/api/reviews")
    public ResponseEntity<Review> createReview(@RequestBody CreateReviewRequest request) {
        // Validate required fields
        if (request.getUserId() == null || request.getRating() == null || request.getContent() == null ||
            request.getContent().isEmpty() || request.getTitle() == null || request.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        if ((request.getApartmentId() == null || request.getApartmentId() == 0) &&
            (request.getLandlordId() == null || request.getLandlordId() == 0)){
            return ResponseEntity.badRequest().build();
        }

        // Create new review
        Review newReview = new Review();
        newReview.setUserId(request.getUserId());
        newReview.setApartmentId(request.getApartmentId());
        newReview.setLandlordId(request.getLandlordId());
        newReview.setRating(request.getRating());
        newReview.setContent(request.getContent());
        newReview.setTitle(request.getTitle());

        Review savedReview = reviewService.createReview(newReview);

        // Update apartment's or landlord's average rating and review count
        if (request.getApartmentId() != 0) {
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
        } else {
            Optional<Landlord> landlordOpt = landlordService.findById(request.getLandlordId());
            if (landlordOpt.isPresent()){
                Landlord landlord = landlordOpt.get();
                List<Review> allReviews = reviewService.getReviewsByLandlordId(request.getLandlordId());

                double totalRating = 0;
                for (Review review : allReviews) {
                    totalRating += review.getRating();
                }
                landlord.setAverageRating(totalRating/allReviews.size());
                landlord.setReviewCount(allReviews.size());
                landlordService.updateLandlord(landlord);
            }
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