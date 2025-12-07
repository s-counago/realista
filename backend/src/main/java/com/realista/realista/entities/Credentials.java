package com.realista.realista.entities;

import jakarta.persistence.*;

@Entity
@Table(name="credentials")
public class Credentials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String hashedPassword;
    private String email;
}
