	package com.backend.entity;
	
	import java.io.Serializable;
	
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.Table;
	import lombok.Data;
	
	@Data
	@Entity
	@Table(name = "customerRoles")
	public class CustomerRoles {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;
	
	    @ManyToOne
	    @JoinColumn(name = "customerId")
	    private Customer customer;
	
	    @ManyToOne
	    @JoinColumn(name = "Roleid")
	    private Role role;
	    

	    @Override
	    public String toString() {
	        return "";
	    }
	
	}
