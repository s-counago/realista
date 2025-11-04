package com.realista.realista.services;

import com.realista.realista.entities.Review;
import com.realista.realista.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByApartmentId(Long apartmentId) {
        return reviewRepository.findByApartmentIdOrderByCreatedAtDesc(apartmentId);
    }

    public List<Review> getReviewsByLandlordId(Long landlordId) {
        return reviewRepository.findByLandlordIdOrderByCreatedAtDesc(landlordId);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
}
