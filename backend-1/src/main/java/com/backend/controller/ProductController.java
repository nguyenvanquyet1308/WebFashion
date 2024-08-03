package com.backend.controller;

import org.springframework.data.domain.Pageable;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dao.ProductDAO;
import com.backend.entity.Product;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user/product")
public class ProductController {

	
	@Autowired
	ProductDAO productdao;
	
	@RequestMapping("searchName")
	public ResponseEntity<Page<Product>> searchName(@RequestParam int page, @RequestParam int pageSize, @RequestParam String keywords) {
	    Pageable pageable = (Pageable) PageRequest.of(page, pageSize);
	    Page<Product> itemPage =  productdao.findAllByNameLike("%" + keywords + "%", pageable);
	    return ResponseEntity.ok(itemPage);
	
	}

}
