package com.shakeup.service;

import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
import com.shakeup.request.UserSignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<Users> findByEmail(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        System.out.println(user);
        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    public String signUp(UserSignUpRequest userSignUpRequest){
        Users tempuser = userSignUpRequest.toEntity();
        userRepository.save(tempuser);
        return "success";
    }

    public String checkId(String id){
        Optional<Users> user = userRepository.findById(id);
        System.out.println(user);
        if (user.isPresent()) {
            return "fail";
        } else {
            return "success";
        }
    }

    public String checkName(String name){
        Optional<Users> user = userRepository.findByName(name);
        System.out.println(user);
        if (user.isPresent()) {
            return "fail";
        } else {
            return "success";
        }
    }
}
