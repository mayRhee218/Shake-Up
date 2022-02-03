package com.shakeup.controller;

import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.video.VideoCreateRequest;
import com.shakeup.request.video.VideoFindResponse;
import com.shakeup.request.video.VideoUpdateRequest;
import com.shakeup.service.VideoService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/video")
@RestController
public class VideoController {

    @Autowired
    private VideoService videoService;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private UserRepository userRepository;

    public static final Logger logger = LoggerFactory.getLogger(VideoController.class);

    @ApiOperation(value = "영상 생성", notes = "영상 정보를 받는다. 게시판 생성 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/create")
    public ResponseEntity<String> createVideo(@RequestBody VideoCreateRequest videoCreateRequest) {
        String res = videoService.createVideo(videoCreateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);

    }

    @ApiOperation(value = "영상 수정", notes = "영상 정보를 받는다. 게시판 수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/update")
    public ResponseEntity<String> updateVideo(@RequestBody VideoUpdateRequest videoUpdateRequest) {
        String res = videoService.upadateVideo(videoUpdateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @ApiOperation(value = "영상 삭제", notes = "영상 정보를 받는다. 게시판 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/delete/{vid}")
    public ResponseEntity<String> deleteVideo(@PathVariable("vid") long vid) {
        String res = videoService.deleteVideos(vid);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }
    @ApiOperation(value = "영상 전체 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/all")
    public ResponseEntity<List<Videos>> readAllVideo(){
        List<Videos> res = videoService.readAllVideo();
        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @ApiOperation(value = "카테고리 별 영상 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/category/{category}")
    public ResponseEntity<List<Videos>> readCategoryVideo(@PathVariable("category") int category){
        List<Videos> res = videoService.readCategoryVideo(category);

        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @ApiOperation(value = "영상 하나 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/one/{vid}")
    public ResponseEntity<Videos> readOneVideo(@PathVariable("vid") long vid){
        Optional<Videos> res = videoService.readOneVideo(vid);

        return new ResponseEntity<Videos>(res.get(), HttpStatus.OK);
    }
    @ApiOperation(value = "나의 영상 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/my/{uid}")
    public ResponseEntity<List<Videos>> readMyVideo(@PathVariable("uid") int uid){
        List<Videos> res = videoService.readMyVideo(uid);

        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @ApiOperation(value = "나의 좋아요 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/mylike")
    public ResponseEntity<List<Videos>> readMylikeVideo(@RequestBody UserlikeCreateRequest userlikeCreateRequest){
        List<Videos> res = videoService.readMylikeVideo(userlikeCreateRequest);

        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @GetMapping(value = "/find/{vid}")
    public ResponseEntity<?> findVideo(@PathVariable("vid") int vid) {

        Optional<Videos> temp = videoRepository.findByVid(vid);
        System.out.println("test");
        Users users = userRepository.findByUid(temp.get().getUid()).get();
        if (temp.isPresent()) {
            Videos videos = temp.get();
            VideoFindResponse videoFindResponse = new VideoFindResponse();
            videoFindResponse.setVid(videos.getVid());
            videoFindResponse.setTitle(videos.getTitle());
            videoFindResponse.setThumbnail(videos.getThumbnail());
            videoFindResponse.setUrl(videos.getUrl());
            videoFindResponse.setProfile(users.getProfile());
            return new ResponseEntity<VideoFindResponse>(videoFindResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>("fail", HttpStatus.OK);
    }

}
