package com.realista.realista.responses;

import com.realista.realista.entities.Apartment;
import com.realista.realista.entities.Landlord;

import java.time.LocalDateTime;

public class ApartmentDetailsResponse {
    private Long id;
    private Long landlordId;
    private String landlordName;
    private String provincia;
    private String ayuntamiento;
    private String calle;
    private String numero;
    private String piso;
    private String puerta;
    private Double averageRating;
    private Integer reviewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor from Apartment and optional Landlord
    public ApartmentDetailsResponse(Apartment apartment, Landlord landlord) {
        this.id = apartment.getId();
        this.landlordId = apartment.getLandlordId();
        this.landlordName = landlord != null ? landlord.getName() : null;
        this.provincia = apartment.getProvincia();
        this.ayuntamiento = apartment.getAyuntamiento();
        this.calle = apartment.getCalle();
        this.numero = apartment.getNumero();
        this.piso = apartment.getPiso();
        this.puerta = apartment.getPuerta();
        this.averageRating = apartment.getAverageRating();
        this.reviewCount = apartment.getReviewCount();
        this.createdAt = apartment.getCreatedAt();
        this.updatedAt = apartment.getUpdatedAt();
    }

    // Getters
    public Long getId() { return id; }
    public Long getLandlordId() { return landlordId; }
    public String getLandlordName() { return landlordName; }
    public String getProvincia() { return provincia; }
    public String getAyuntamiento() { return ayuntamiento; }
    public String getCalle() { return calle; }
    public String getNumero() { return numero; }
    public String getPiso() { return piso; }
    public String getPuerta() { return puerta; }
    public Double getAverageRating() { return averageRating; }
    public Integer getReviewCount() { return reviewCount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
