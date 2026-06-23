package com.example.studentmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class StudentModel {
    @Id
    @Column(name = "id")
    private Long studentId;

    @Column(nullable = false)
    private String name;

    private Double cgpa;

    private String branch;
    
}
