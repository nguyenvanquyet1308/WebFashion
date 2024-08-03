package com.backend.dao;

import java.util.Optional;

import com.backend.entity.Customer;



public interface IUserService {

	Integer saveUser(Customer customer);
	
    Optional<Customer> findByEmail(String email);

}