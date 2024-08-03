package com.backend.entity;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Data
@Entity
@Table(name = "orderDetail")
public class OrderDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderDetailId;

	@ManyToOne
	@JoinColumn(name = "orderId")
	private Orders order;

	@ManyToOne
	@JoinColumn(name = "productId")
	private Product product;

	private Integer quantity;

	private double unitPrice;

//	@Transient
//	Float subTotal;
//
//	public OrderDetail(Product product) {
//		this.product = product;
//		this.quantity = 1;
//		this.subTotal = product.getUnitPrice();
//	}
//
////
//
//	public double getSubTotal() {
//		subTotal = product.getUnitPrice() * quantity;
//		return subTotal;
//	}
//
//	public OrderDetail() {
//		super();
//	}

}
