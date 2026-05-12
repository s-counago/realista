package com.realista.realista.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "apartments", indexes = {
    @Index(name = "idx_apartment_landlord", columnList = "landlord_id")
})
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", foreignKey = @ForeignKey(name = "fk_apartment_landlord"))
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Landlord landlord;

    @Column(nullable = false)
    private String provincia;

    @Column(nullable = false)
    private String ayuntamiento;

    @Column(nullable = false)
    private String calle;

    @Column(nullable = false)
    private String numero;

    private String piso;
    private String puerta;

    @Column(name = "average_rating")
    private Double averageRating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (reviewCount == null) {
            reviewCount = 0;
        }
        if (averageRating == null) {
            averageRating = 0.0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Landlord getLandlord() { return landlord; }
    public void setLandlord(Landlord landlord) { this.landlord = landlord; }

    // Convenience method for backward compatibility
    public Long getLandlordId() { return landlord != null ? landlord.getId() : null; }
    public void setLandlordId(Long landlordId) { 
        if (landlordId != null) {
            this.landlord = new Landlord();
            this.landlord.setId(landlordId);
        } else {
            this.landlord = null;
        }
    }

    public String getProvincia() { return provincia; }
    public void setProvincia(String provincia) { this.provincia = provincia; }

    public String getAyuntamiento() { return ayuntamiento; }
    public void setAyuntamiento(String ayuntamiento) { this.ayuntamiento = ayuntamiento; }

    public String getCalle() { return calle; }
    public void setCalle(String calle) { this.calle = calle; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getPiso() { return piso; }
    public void setPiso(String piso) { this.piso = piso; }

    public String getPuerta() { return puerta; }
    public void setPuerta(String puerta) { this.puerta = puerta; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
