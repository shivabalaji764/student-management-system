package com.example.studentmanagementsystem.controller;

import com.example.studentmanagementsystem.model.UserModel;
import com.example.studentmanagementsystem.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/users")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class UserController {
    public final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestBody UserModel user){
        if(this.userService.addUser(user)){
            return ResponseEntity.ok("User added successfully");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exist");
    }

    @PostMapping("/login")
    public ResponseEntity<String> check(@RequestBody Map<String, String> user){
        if(this.userService.check(user.get("userName"), user.get("password"))){
            return ResponseEntity.ok("login successful");
        }
        return ResponseEntity.status(403).body("Invalid Credentials");
    }
}
