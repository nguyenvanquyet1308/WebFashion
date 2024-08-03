package com.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.CartItem;
import com.backend.entity.Customer;
import com.backend.entity.Product;

public interface CartDAO extends JpaRepository<CartItem, Integer> {

	List<CartItem> findByCustomerCustomerId(Integer customerId);

    List<CartItem> findByProductAndCustomer(Product product, Customer customer);

}
