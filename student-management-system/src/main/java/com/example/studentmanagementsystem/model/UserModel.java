package com.example.studentmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long userId;

    @Column(name = "name", unique = true)
    private String userName;

    @Column(nullable = false)
    private String password;

    private String email;
}
