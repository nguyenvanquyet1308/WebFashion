package com.backend.admin;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CustomerDAO;
import com.backend.dao.OrdersDAO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/admin")
public class ManageStatistical {

	@Autowired
	CustomerDAO customerdao;
	@Autowired
	OrdersDAO ordersdao;

	@GetMapping("/countCustomer")
	public ResponseEntity<?> getCountCustomer() {
		System.out.println("hihi");
		return ResponseEntity.ok(customerdao.count());

	}

	@GetMapping("/countOrders")
	public ResponseEntity<?> getCountOrders() {
		return ResponseEntity.ok(ordersdao.count());
	}

	@GetMapping("/countOrdersByTrue")
	public ResponseEntity<?> getCountOrdersByTrue() {
		return ResponseEntity.ok(ordersdao.countByStatus(true));
	}

	@GetMapping("/countOrdersByFalse")
	public ResponseEntity<?> getCountOrdersByFalse() {
		return ResponseEntity.ok(ordersdao.countByStatus(false));
	}

	 @GetMapping("/sumAmountBetweenDates")
	    public ResponseEntity<?> getSumAmountBetweenDates(
	            @RequestParam("startDate") @DateTimeFormat(pattern = "dd/MM/yyyy") Date startDate,
	            @RequestParam("endDate") @DateTimeFormat(pattern = "dd/MM/yyyy") Date endDate) {
		 
		return ResponseEntity.ok(ordersdao.sumAmountBetweenDates(startDate, endDate));

	}

}
