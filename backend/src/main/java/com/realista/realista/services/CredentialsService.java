package com.realista.realista.services;

import com.realista.realista.entities.Credentials;
import com.realista.realista.repositories.CredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CredentialsService {
    @Autowired
    private CredentialsRepository credentialsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Credentials registro(Credentials credentials){
        // Hash the password before saving
        credentials.setHashedPassword(passwordEncoder.encode(credentials.getHashedPassword()));
        return credentialsRepository.save(credentials);
    }

    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public Optional<Credentials> findById(Long id){ return credentialsRepository.findById(id); }
    public Optional<Credentials> findByEmail(String email){ return credentialsRepository.findByEmail(email); }
}
