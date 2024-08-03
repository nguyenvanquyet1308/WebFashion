package com.backend.controller;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.CartDAO;
import com.backend.dao.CustomerDAO;
import com.backend.dao.OrderDetailDAO;
import com.backend.dao.OrdersDAO;
import com.backend.entity.CartItem;
import com.backend.entity.Customer;
import com.backend.entity.OrderDetail;
import com.backend.entity.Orders;
import com.backend.entity.Product;
import com.backend.library.CartService;
import com.backend.util.JWTUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user/cart")
public class CartController {
	@Autowired
	CartService cartService;
	@Autowired
	CartDAO cartDao;
	@Autowired
	CustomerDAO customerdao;
	@Autowired
	JWTUtil jwtutil;
	@Autowired
	OrdersDAO ordersdao;
	@Autowired
	OrderDetailDAO orderDetailDAO;

	@GetMapping
	public List<CartItem> getCartItem() {
		return cartDao.findAll();
	}

	@GetMapping("/customer")
	public List<CartItem> getCartByCustomer(@RequestParam Integer customerId) {
		System.out.println("đây là customercart: " + cartDao.findByCustomerCustomerId(customerId));
		return cartDao.findByCustomerCustomerId(customerId);
	}

	@PostMapping("/add")
	public ResponseEntity<String> addCartItem(@RequestBody CartItem cartItem) {
		List<CartItem> item = (List<CartItem>) cartDao.findByProductAndCustomer(cartItem.getProduct(),
				cartItem.getCustomer());
		if (item != null && !item.isEmpty()) {
			for (CartItem quantity : item) {
				quantity.setQuantity(quantity.getQuantity() + cartItem.getQuantity());
				cartDao.save(quantity);
			}
			System.out.println("cập nhật số lượng thnafh công");
			return new ResponseEntity<>("Cập nhật giỏ hàng thành công", HttpStatus.OK);
		} else {
			cartDao.save(cartItem);
			System.out.println("thêm sp thnafh công");
			return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công", HttpStatus.CREATED);

		}

	}

	@PutMapping("/updateQuantity")
	public ResponseEntity<String> updateQuantity(@RequestBody CartItem cartItem) {
		Optional<CartItem> cartItemOptional = cartDao.findById(cartItem.getId());

		if (cartItemOptional.isPresent()) {
			CartItem item = cartItemOptional.get();
			item.setQuantity(cartItem.getQuantity());
			cartDao.save(item);
			System.out.println("update thành công: " + item.getQuantity());
			return ResponseEntity.ok("update quantity thành công");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("lỗi");
		}
	}

	@PutMapping("/update/{id}")
	public void Update(@PathVariable("id") Integer id, @RequestBody CartItem cartItem) {
		cartDao.save(cartItem);
	}

	@DeleteMapping("/delete/{id}")
	public void removeCartItem(@PathVariable("id") Integer id) {
		cartDao.deleteById(id);
	}

	@RequestMapping("/payOrders")
	public ResponseEntity<?> PayOrders(@RequestParam Integer customerId,
			@CookieValue(name = "jwtToken", required = false) String jwtToken) {
		if (jwtToken == null || jwtToken.isEmpty()) {
			System.out.println("khách hàng ko tồn tại");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
		}

		List<CartItem> item = cartDao.findByCustomerCustomerId(customerId);
		CartItem itemCart = item.get(customerId);

		try {
			Claims claims = jwtutil.getClaims(jwtToken);
			String userEmail = claims.getSubject();
			Optional<Customer> itemCustomer = customerdao.findByEmail(userEmail);// lấy customer hiện tại bằng giải mã
																					// token
			Customer customer = itemCustomer.get();
			// đưa vào orders
			Orders order = new Orders();
			order.setAmount(itemCart.getQuantity() * itemCart.getProduct().getUnitPrice());
			order.setCustomer(customer);
			order.setOrderDate(new Date());
			order.setStatus(false);
			ordersdao.save(order);
			
			for (CartItem cart : item) {
				OrderDetail orderdetail = new OrderDetail();
				orderdetail.setOrder(order);
				orderdetail.setProduct(cart.getProduct());
				orderdetail.setQuantity(cart.getQuantity());
				orderdetail.setUnitPrice(cart.getProduct().getUnitPrice());
				orderDetailDAO.save(orderdetail);
			}
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

}
