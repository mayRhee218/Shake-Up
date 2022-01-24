package com.shakeup.service;

import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
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
}
