package com.shakeup.controller;

import com.shakeup.model.Userlike;
import com.shakeup.repository.UserlikeRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/userlike")
@RestController
public class UserlikeController {
    @Autowired
    private UserlikeRepository userlikeRepository;

    @Autowired
    private VideoRepository videoRepository;

    @ApiOperation(value = "나의 좋아요 리스트 불러오기")
    @PostMapping(value = "/read/{uid}")
    public List<Userlike> createUserlike(@PathVariable("uid") int uid){
        List<Userlike> res =  userlikeRepository.findByUid(uid);
        for (Userlike r:res) {
            System.out.println(r.toString());
        }
        return res;
    }


}
