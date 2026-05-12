package com.realista.realista.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_review_user", columnList = "user_id"),
    @Index(name = "idx_review_landlord", columnList = "landlord_id"),
    @Index(name = "idx_review_apartment", columnList = "apartment_id")
})
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_review_user"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", foreignKey = @ForeignKey(name = "fk_review_landlord"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Landlord landlord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", foreignKey = @ForeignKey(name = "fk_review_apartment"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Apartment apartment;

    @Column(nullable = false)
    private Integer rating;

    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Landlord getLandlord() { return landlord; }
    public void setLandlord(Landlord landlord) { this.landlord = landlord; }

    public Apartment getApartment() { return apartment; }
    public void setApartment(Apartment apartment) { this.apartment = apartment; }

    // Convenience methods for backward compatibility
    public Long getUserId() { return user != null ? user.getId() : null; }
    public void setUserId(Long userId) { 
        if (userId != null) {
            this.user = new User();
            this.user.setId(userId);
        }
    }

    public Long getLandlordId() { return landlord != null ? landlord.getId() : null; }
    public void setLandlordId(Long landlordId) { 
        if (landlordId != null) {
            this.landlord = new Landlord();
            this.landlord.setId(landlordId);
        }
    }

    public Long getApartmentId() { return apartment != null ? apartment.getId() : null; }
    public void setApartmentId(Long apartmentId) { 
        if (apartmentId != null) {
            this.apartment = new Apartment();
            this.apartment.setId(apartmentId);
        }
    }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
