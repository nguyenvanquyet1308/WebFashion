package com.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Role;

public interface RoleDAO extends JpaRepository<Role, String> {

}
