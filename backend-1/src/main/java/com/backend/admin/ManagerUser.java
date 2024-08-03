package com.backend.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CartDAO;
import com.backend.dao.CustomerDAO;
import com.backend.entity.CartItem;
import com.backend.entity.Customer;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/admin/user")
public class ManagerUser {

	@Autowired
	CustomerDAO customerDao;

	@Autowired
	CartDAO cartdao;

	@GetMapping()
	public ResponseEntity<List<Customer>> getCustomer() {
		List<Customer> customer = customerDao.findAll();
		return ResponseEntity.ok(customer);
	}

	@PutMapping("update/{customerId}")
	public ResponseEntity<Customer> UpdateCustomer(@PathVariable("customerId") Integer customerId ,  @RequestBody Customer customer) {

		if (customerDao.existsById(customer.getCustomerId())) {
			Customer updateCustomer = customerDao.save(customer);
			return ResponseEntity.ok(updateCustomer);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@DeleteMapping("delete/{customerId}")
	public ResponseEntity<?> DeleteCustomer(@PathVariable Integer customerId) {
		List<CartItem> item = cartdao.findByCustomerCustomerId(customerId);
		cartdao.deleteAll(item);
		
		if (customerDao.existsById(customerId)) {
			customerDao.deleteById(customerId);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}
	@PostMapping()
	public ResponseEntity<?> AddCustomer(@RequestBody Customer customer) {

		Customer addcustomer = customerDao.save(customer);
		return ResponseEntity.ok(addcustomer);
	}
}
