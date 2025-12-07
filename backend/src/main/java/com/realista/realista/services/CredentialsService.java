package com.realista.realista.services;

import com.realista.realista.entities.Credentials;
import com.realista.realista.repositories.CredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CredentialsService {
    @Autowired
    private CredentialsRepository credentialsRepository;

    public Credentials registro(Credentials credentials){
        return credentialsRepository.save(credentials);
    }

    public Optional<Credentials> findById(Long id){ return credentialsRepository.findById(id); }
    public Optional<Credentials> findByEmail(String email){ return credentialsRepository.findByEmail(email); }
}
