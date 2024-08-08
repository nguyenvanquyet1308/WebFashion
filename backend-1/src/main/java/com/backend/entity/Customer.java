package com.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customers")
@ToString(exclude = {"customerRoles", "orders"})
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    private String username; 
    private String email;
    private String password;

    @Transient
    private String confirmPassword;

    private String phone;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date registeredDate;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<CustomerRoles> customerRoles;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;
    
    @Transient
    private List<String> roleNames;

    public List<String> getRoleNames() {
        if (customerRoles != null) {
            return customerRoles.stream()
                .map(customerRole -> customerRole.getRole().getId())
                .collect(Collectors.toList());
        }
        return null;
    }
}