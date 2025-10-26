package com.realista.realista.services;

import com.realista.realista.entities.Apartment;
import com.realista.realista.repositories.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApartmentService {
    @Autowired
    private ApartmentRepository apartmentRepository;

    public Apartment createApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }

    public Optional<Apartment> findApartment(String provincia, String ayuntamiento, 
                                            String calle, String numero, 
                                            String piso, String puerta) {
        return apartmentRepository.findByProvinciaAndAyuntamientoAndCalleAndNumeroAndPisoAndPuerta(
            provincia, ayuntamiento, calle, numero, piso, puerta
        );
    }

    public Optional<Apartment> findById(Long id) {
        return apartmentRepository.findById(id);
    }

    public Apartment updateApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }
}
