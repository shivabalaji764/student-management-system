package com.example.studentmanagementsystem.controller;

import com.example.studentmanagementsystem.model.StudentModel;
import com.example.studentmanagementsystem.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(
        origins = "http://127.0.0.1:5500",
        allowCredentials = "true"
)
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody StudentModel student){
        HttpStatus status = this.studentService.addStudent(student);
        return ResponseEntity.status(status).build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<StudentModel>> getStudents(){
        return ResponseEntity.ok(
                this.studentService.getStudents()
        );
    }

    @GetMapping("/getstudent")
    public ResponseEntity<StudentModel> getStudent(@RequestParam Long id){
        return ResponseEntity.ok(
                this.studentService.getStudent(id)
        );
    }

    @PostMapping("/save")
    public ResponseEntity<String> update(@RequestBody StudentModel student){
        studentService.save(student);
        return ResponseEntity.ok("Saved successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam Long id){
        studentService.delete(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
}
