package com.shakeup.controller;


import com.shakeup.model.User;
import com.shakeup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{email}")
    public ResponseEntity<String> getId(@PathVariable("email") String email){
        Optional<User> user = userService.findByEmail(email);
        System.out.println(user.toString());
        return new ResponseEntity<String>(user.get().getId(), HttpStatus.OK);
    }
}
