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
	public ResponseEntity<?> payOrders(@CookieValue(name = "jwtToken", required = false) String jwtToken) {
		System.out.println("id của customer: chạy tới đây");
		System.out.println("id của customer: chạy tới đây token" + jwtToken);
		if (jwtToken == null || jwtToken.isEmpty()) {
			System.out.println("khách hàng ko tồn tại");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
		}
		try {
			Claims claims = jwtutil.getClaims(jwtToken);
			String userEmail = claims.getSubject();
			System.out.println("email" + userEmail);
			Optional<Customer> itemCustomer = customerdao.findByEmail(userEmail); // lấy customer hiện tại bằng giải mã
																					// token
			System.out.println("email" + itemCustomer.get());

			Customer customer = itemCustomer.orElse(null);
			if (customer == null) {
				System.out.println("khách hàng ko tồn tại");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khách hàng không tồn tại");
			}
			List<CartItem> items = cartDao.findByCustomerCustomerId(customer.getCustomerId());
			
			if (items.isEmpty()) {
				System.out.println("Giỏ hàng rỗng");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Giỏ hàng rỗng");
			}
			double totalAmount = 0;

			for (CartItem item : items) {
				double itemTotal = item.getQuantity() * item.getProduct().getUnitPrice();
			    totalAmount += itemTotal;
			}
			Orders order = new Orders();
			order.setAmount(totalAmount);
//			order.setAmount(items.get(0).getQuantity() * items.get(0).getProduct().getUnitPrice());
			System.out.println();
			order.setCustomer(customer);
			order.setOrderDate(new Date());
			order.setStatus(false);
			ordersdao.save(order);
			// Duyệt qua từng item trong giỏ hàng
			for (CartItem itemCart : items) {
				System.out.println("item của cart: " + itemCart);
				System.out.println("id của customer: " + customer.getCustomerId());
				// Đưa vào orders
		
				OrderDetail orderdetail = new OrderDetail();
				orderdetail.setOrder(order);
				orderdetail.setProduct(itemCart.getProduct());
				orderdetail.setQuantity(itemCart.getQuantity());
				orderdetail.setUnitPrice(itemCart.getProduct().getUnitPrice());
				orderDetailDAO.save(orderdetail);
			}
			cartDao.deleteAll();
			return ResponseEntity.ok(ordersdao.findByCustomerCustomerId(customer.getCustomerId()));
		} catch (Exception e) {
			System.out.println("lỗi" + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
		}
	}

	
}
