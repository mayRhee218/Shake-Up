package com.shakeup.controller;

import com.shakeup.model.Users;
import com.shakeup.request.UserSignUpRequest;
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
        Optional<Users> user = userService.findByEmail(email);
        System.out.println(user.toString());
        return new ResponseEntity<String>(user.get().getId(), HttpStatus.OK);
    }

    // 날짜 => 프론트에서
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest request){
        String user = userService.signUp(request);
        if (user.equals("fail")) {
            return new ResponseEntity<>("회원가입 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @GetMapping(value = "/idcheck/{id}")
    public ResponseEntity<String> checkId(@PathVariable("id") String id){
        String result = userService.checkId(id);
        if (result.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<String> checkName(@PathVariable("name") String name){
        String result = userService.checkName(name);
        if (result.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

}
