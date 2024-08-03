package com.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CustomerDAO;
import com.backend.dao.CustomerRolesDAO;
import com.backend.dao.RoleDAO;
import com.backend.entity.CustomerRoles;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/admin/securityUser")
public class CustomerRestController {
	@Autowired
	RoleDAO roledao;
	@Autowired
	CustomerRolesDAO customerroledao;
	@Autowired
	CustomerDAO customerdao;

	@GetMapping()
	public Map<String, Object> getCustomerSecurity() {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("roles", roledao.findAll());
		data.put("customerrole", customerroledao.findAll());
		data.put("customer", customerdao.findAll());
		return data;

	}

	@PostMapping
	public ResponseEntity<CustomerRoles> insert(@RequestBody CustomerRoles customerroles) {
		CustomerRoles item = customerroledao.save(customerroles);
		return ResponseEntity.ok(item);
	}

	@DeleteMapping("{customerId}/{roleId}")
	public ResponseEntity<Void> delete(@PathVariable Integer customerId, @PathVariable String roleId) {
		CustomerRoles customerRole = customerroledao.findByCustomer_CustomerIdAndRole_Id(customerId, roleId);
		if (customerRole != null) {
			customerroledao.delete(customerRole);
		}
		return ResponseEntity.noContent().build();
	}

}
