package com.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.CustomerRoles;

public interface CustomerRolesDAO extends JpaRepository<CustomerRoles, Integer> {

    CustomerRoles findByCustomer_CustomerIdAndRole_Id(Integer customerId, String roleId);

}
