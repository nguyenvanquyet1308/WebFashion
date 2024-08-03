package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.backend.dao.ProductDAO;
import com.backend.entity.Product;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor // tự ta constructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HomePages {
	@Autowired 
	ProductDAO productDao;
	
	@GetMapping("api/user/homepage")
	 public Page<Product> getProducts(@RequestParam int page, @RequestParam int pageSize) {
        return productDao.findAll(PageRequest.of(page, pageSize));
    }


}
