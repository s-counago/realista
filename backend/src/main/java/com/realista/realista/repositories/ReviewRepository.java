package com.realista.realista.repositories;

import com.realista.realista.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApartmentIdOrderByCreatedAtDesc(Long apartmentId);
    List<Review> findByLandlordIdOrderByCreatedAtDesc(Long landlordId);
}
