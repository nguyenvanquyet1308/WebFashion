package com.backend.service;

import java.util.HashSet;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dao.CustomerDAO; // Đảm bảo rằng tên và package của bạn chính xác
import com.backend.dao.IUserService;
import com.backend.entity.Customer;
import com.backend.entity.CustomerRoles;

@Service
public class UserServiceImpl implements IUserService,UserDetailsService {
    
    @Autowired
    private CustomerDAO customerDAO; // Thay đổi thành CustomerDAO

    @Autowired
    private BCryptPasswordEncoder bCryptEncoder;

    @Override
	public Integer saveUser(Customer customer) {
		//Encode password before saving to DB
    	customer.setPassword(bCryptEncoder.encode(customer.getPassword()));
		return customerDAO.save(customer).getCustomerId();
	}

	//find user by username
	@Override
	public Optional<Customer> findByEmail(String email) {
		return customerDAO.findByEmail(email);
	}
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Customer> opt = customerDAO.findByEmail(email);

        if (opt.isEmpty()) {
            throw new UsernameNotFoundException("User with username: " + email + " not found");
        }

        Customer customer = opt.get(); // Lấy thông tin người dùng từ DB
        List<CustomerRoles> roles = customer.getCustomerRoles();
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (CustomerRoles role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getRole().getName())); // Giả sử `roleName` là thuộc tính chứa tên role
        }

        return new org.springframework.security.core.userdetails.User(
        		email,
                customer.getPassword(),
                authorities
        );
    }
}
