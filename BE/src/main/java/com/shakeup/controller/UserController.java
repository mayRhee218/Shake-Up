package com.shakeup.controller;

import com.shakeup.model.BasicResponse;
import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
import com.shakeup.request.UserChangeInfoRequest;
import com.shakeup.request.UserResetPwdRequest;
import com.shakeup.request.UserSendpwRequest;
import com.shakeup.request.UserSignUpRequest;
import com.shakeup.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @ApiOperation(value = "로그인")
    @GetMapping(value = "/login")
    public Object login(@RequestParam(required = true) String id,
                        @RequestParam(required = true) String password) {
        BasicResponse res = userService.login(id, password);

        if (res.data.equals("success")) {
            return new ResponseEntity<>(res, HttpStatus.OK);

        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

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
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest request) {
        String user = userService.signUp(request);
        if (user.equals("fail")) {
            return new ResponseEntity<>("회원가입 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("회원가입 성공", HttpStatus.OK);
    }

    @GetMapping(value = "/idcheck/{id}")
    public ResponseEntity<String> checkId(@PathVariable("id") String id) {
        String result = userService.checkId(id);
        if (result.equals("fail")) {
            return new ResponseEntity<>("fail", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<String> checkName(@PathVariable("name") String name) {
        String result = userService.checkName(name);
        if (result.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }


    @ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping
    public ResponseEntity<String> modifyUser(@RequestBody UserChangeInfoRequest request) {
        logger.info("modifyUser - 호출");
        String res = userService.changeinfo(request);

        if (res.equals("fail")) {
            return new ResponseEntity<>("변경 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("변경 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "id에 해당하는 회원의 정보를 삭제한다.(그와 동시에 회원이 적은 게시글들의 id가 '탈퇴한 회원'으로 바뀐다.) 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
        logger.info("deleteUser - 호출");
        String res = userService.deleteUser(id);

        if (res.equals("fail")) {
            return new ResponseEntity<>("계정 삭제 실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("계정 삭제 성공", HttpStatus.OK);
    }

}
