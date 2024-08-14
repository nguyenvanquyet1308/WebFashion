package com.backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.*;

public interface CustomerDAO extends JpaRepository<Customer, Integer> {
	
    Optional<Customer> findByEmail(String email);

    long count();
	

}
	