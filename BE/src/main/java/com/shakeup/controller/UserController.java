package com.shakeup.controller;

import com.shakeup.model.Users;
import com.shakeup.request.UserResetPwdRequest;
import com.shakeup.request.UserSendpwRequest;
import com.shakeup.request.UserSignUpRequest;
import com.shakeup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{email}")
    public ResponseEntity<String> getId(@PathVariable("email") String email) {
        Optional<Users> user = userService.findByEmail(email);
        if (!user.isPresent()) {
            return new ResponseEntity<String>("찾는 데이터가 없습니다.", HttpStatus.FAILED_DEPENDENCY);
        }
        return new ResponseEntity<String>(user.get().getId(), HttpStatus.OK);
    }

    @PostMapping(value = "/sendpw")
    public ResponseEntity<String> sendId(@RequestBody UserSendpwRequest userSendpwRequest) {
        String check = "값 없음.";
        String res = userService.sendPw(userSendpwRequest);
        if (check.equals(res)) {
            return new ResponseEntity<>("올바른 정보를 입력하세요.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.sendPw(userSendpwRequest), HttpStatus.OK);
    }

    @PostMapping(value = "/resetpw")
    public ResponseEntity<String> ResetPw(@RequestBody UserResetPwdRequest userResetPwdRequest) {
        String res = userService.resetPw(userResetPwdRequest);
        if (res.equals("fail")) {
            return new ResponseEntity<>("변경 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("변경 성공", HttpStatus.OK);
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