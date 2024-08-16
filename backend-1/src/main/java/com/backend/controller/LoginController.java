package com.backend.controller;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.backend.dao.CustomerDAO;
import com.backend.dao.IUserService;
import com.backend.entity.Customer;
import com.backend.util.JWTUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import com.backend.entity.CustomerResponse;
import com.backend.entity.CustomerRoles;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/login")
public class LoginController {

	@Autowired
	private CustomerDAO customerDAO;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JWTUtil jwtutil;
	@Autowired
	IUserService iUserService;

//
//    @PostMapping("/authenticate")
//    public ResponseEntity<?> authenticateUser(@RequestParam("email") String email,
//                                              @RequestParam("password") String password) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(email, password));
//
//        
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            Customer customer = customerDAO.findByEmail(email);
//            String token =jwtUtil.generateToken(customer.getEmail());
//            System.out.println(token);
//
//            JwtResponse jwtResponse = new JwtResponse(token, customer.getUsername(), customer.getEmail(), customer.getCustomerRoles());
//
//            return ResponseEntity.ok(jwtResponse);
//        } catch (BadCredentialsException e) {
//        	System.out.println(e);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực không thành công: Mật khẩu không đúng");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực không thành công: " + e.getMessage());
//        }
//    }

	@GetMapping("/getCurrent")
	public ResponseEntity<?> getCurrent(@CookieValue(name = "jwtToken", required = false) String jwtToken) {
		System.out.println("check cookie từ client ....");
		System.out.println("token: " + jwtToken);
		if (jwtToken == null || jwtToken.isEmpty()) {
			System.out.println("khách hàng ko tồn tại");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
		}
		try {
			Claims claims = jwtutil.getClaims(jwtToken);
			String userEmail = claims.getSubject();
			System.out.println("email: " + userEmail);
			Optional<Customer> itemCustomer = customerDAO.findByEmail(userEmail);
			Customer customer = itemCustomer.get();
			System.out.println(customer.getCustomerRoles());
			if (customer != null) {
				return ResponseEntity.ok(customer);

			} else {
				System.out.println("khách hàng ko tồn tại1");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
			}
		} catch (Exception e) {
			System.out.println("khách hàng ko tồn tại3");
			System.out.println("lỗi" + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
		}
	}

	private CustomerRoles convertToCustomerRo(List<String> itemRole) {
		// TODO Auto-generated method stub
		return null;
	}

	@PostMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestParam("customerId") Integer customerId,
			@RequestParam("password") String password, @RequestParam("newPassword") String newPassword,
			@RequestParam("confirmPassword") String confirmPassword) {
		Optional<Customer> customerOptional = customerDAO.findById(customerId);
		if (customerOptional.isPresent()) {
			Customer customer = customerOptional.get();

			if (passwordEncoder.matches(password, customer.getPassword())) {
				if (newPassword.equals(confirmPassword)) {
					customer.setPassword(passwordEncoder.encode(newPassword));
					customerDAO.save(customer);
					System.out.println("Mật khẩu đã được cập nhật thành công");
					return ResponseEntity.ok().body("Mật khẩu đã được cập nhật thành công");
				} else {
					System.out.println("Mật khẩu mới không khớp");
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu mới không khớp");
				}
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu hiện tại không chính xác");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khách hàng không tồn tại");
		}
	}

	@PostMapping("/saveUser")
	public ResponseEntity<String> saveUser(@RequestBody Customer customer) {
		try {
			System.out.println("chạy tới đây");
			Integer item = iUserService.saveUser(customer);
			String message = "User with id '" + item + "' saved successfully!";
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while saving user: " + e.getMessage());
		}
	}

	@PostMapping("/loginUser")
	public ResponseEntity<CustomerResponse> login(@RequestBody Customer customer, HttpServletResponse response) {
		try {
			System.out.println("chạy tới login");
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(customer.getEmail(), customer.getPassword()));
			String token = jwtutil.generateToken(customer.getEmail());
			Optional<Customer> item = customerDAO.findByEmail(customer.getEmail());
			System.out.println(customer.getEmail());
			if (item.isPresent()) {
				Customer itemCustomer = item.get();
				Cookie jwtCookie = new Cookie("jwtToken", token);
				//jwtCookie.setHttpOnly(true);
				jwtCookie.setSecure(true); 
				jwtCookie.setPath("/");
				jwtCookie.setMaxAge(20 * 60);
				response.addCookie(jwtCookie);
				CustomerResponse customerResponse = new CustomerResponse(itemCustomer.getCustomerId(),
						itemCustomer.getRegisteredDate(), token, itemCustomer.getPhone(), itemCustomer.getUsername(),
						itemCustomer.getEmail(), itemCustomer.getCustomerRoles().stream()
								.map(role -> role.getRole().getId()).collect(Collectors.toList()));
				System.out.println("cusstomer role: " + itemCustomer.getCustomerRoles().stream()
						.map(role -> role.getRole().getId()).collect(Collectors.toList()));
				return ResponseEntity.ok(customerResponse);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
		} catch (BadCredentialsException e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> Register(@RequestBody Customer customer) {
		Customer item = customerDAO.save(customer);
		return ResponseEntity.ok(item);
	}
	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<String> checkEmail(@PathVariable("email") String email) {
	    Optional<Customer> customer = customerDAO.findByEmail(email);

	    if (customer.isPresent()) {
	        System.out.println(customer.get().getEmail());
	        if (customer.get().getEmail().equals(email)) {
	            System.out.println("Email đã tồn tại: " + email);
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Đã tồn tại");
	        }
	    } else {
		    System.out.println("ok rồi đó");
	    }
	    return ResponseEntity.ok("thành công");
	}
}
