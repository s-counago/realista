package com.realista.realista.requests;

public class CreateReviewRequest {
    private Long userId;
    private Long apartmentId;
    private Integer rating;
    private String content;
    private String title;

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getApartmentId() { return apartmentId; }
    public void setApartmentId(Long apartmentId) { this.apartmentId = apartmentId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
