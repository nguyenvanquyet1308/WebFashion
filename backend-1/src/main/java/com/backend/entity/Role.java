package com.backend.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    private String id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<CustomerRoles> customerRoles;
    
    @Override
    public String toString() {
        return "";
    }
}
