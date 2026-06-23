package com.example.studentmanagementsystem.service;

import com.example.studentmanagementsystem.model.StudentModel;
import com.example.studentmanagementsystem.repository.StudentRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public HttpStatus addStudent(StudentModel student){
        try{
            if(studentRepository.existsById(student.getStudentId())){
                throw new DuplicateKeyException("Key already exists");
            }
            this.studentRepository.save(student);
            return HttpStatus.OK;
        }catch (DuplicateKeyException e1){
            System.out.println("Key already exists");
            return  HttpStatus.CONFLICT;
        }catch (DataIntegrityViolationException e2){
            System.out.println("Name should not be null");
            return HttpStatus.NO_CONTENT;
        }catch (Exception e3){
            System.out.println("Something went wrong");
            System.out.println(e3.getMessage());
            return HttpStatus.BAD_REQUEST;
        }
    }

    public List<StudentModel> getStudents(){
        return studentRepository.findAll();
    }

    public StudentModel getStudent(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public void save(StudentModel student) {
        studentRepository.save(student);
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
