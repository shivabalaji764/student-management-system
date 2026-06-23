package com.example.studentmanagementsystem.service;

import com.example.studentmanagementsystem.model.UserModel;
import com.example.studentmanagementsystem.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    final private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean addUser(UserModel user){
        try {
            this.userRepository.save(user);
            return true;
        }catch (DataIntegrityViolationException e){
            return false;
        }catch (Exception e){
            System.out.println("Connection issue");
            throw new RuntimeException(e.getMessage());
        }
    }

    public boolean check(String userName, String password){
        Optional<UserModel> userOptional = this.userRepository.findByUserName(userName);
        if(userOptional.isEmpty()) return false;
        UserModel user = userOptional.get();
        return user.getPassword().equals(password);
    }
}
