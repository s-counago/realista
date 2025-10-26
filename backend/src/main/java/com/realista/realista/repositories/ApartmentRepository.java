package com.realista.realista.repositories;

import com.realista.realista.entities.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    Optional<Apartment> findByProvinciaAndAyuntamientoAndCalleAndNumeroAndPisoAndPuerta(
        String provincia, 
        String ayuntamiento, 
        String calle, 
        String numero, 
        String piso, 
        String puerta
    );
}
