package com.realista.realista.services;

import com.realista.realista.entities.Landlord;
import com.realista.realista.repositories.LandlordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LandlordService {
    @Autowired
    private LandlordRepository landlordRepository;

    public Optional<Landlord> findById(Long id) {
        return landlordRepository.findById(id);
    }

    public Landlord createLandlord(Landlord landlord) {
        return landlordRepository.save(landlord);
    }

    public Landlord updateLandlord(Landlord landlord) {
        return landlordRepository.save(landlord);
    }
}
