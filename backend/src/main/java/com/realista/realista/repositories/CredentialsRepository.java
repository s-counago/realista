package com.realista.realista.repositories;

import com.realista.realista.entities.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CredentialsRepository extends JpaRepository<Credentials, Long> {
    public Optional<Credentials> findByEmail(String email);
    public Optional<Credentials> findByUserId(Long userId);
}
