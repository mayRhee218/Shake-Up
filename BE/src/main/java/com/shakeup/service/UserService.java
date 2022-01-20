package com.shakeup.service;

import com.shakeup.model.User;
import com.shakeup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println(user);
        if (user != null) {
            return user;
        } else {
            return null;
        }
    }
}
