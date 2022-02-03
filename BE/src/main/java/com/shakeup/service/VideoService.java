package com.shakeup.service;

import com.shakeup.model.Videos;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.video.VideoCreateRequest;
import com.shakeup.request.video.VideoUpdateRequest;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    //영상 DB저장
    public String createVideo(VideoCreateRequest videoCreateRequest) {
        Videos tempvideo = videoCreateRequest.toEntity();
        System.out.println(videoCreateRequest.getTag());
        try {
            videoRepository.save(tempvideo);
            return "success";
        } catch (Exception e) {
            return "fail";
        }

    }

    public String upadateVideo(VideoUpdateRequest videoUpdateRequest) {
        Videos tempvideo = videoUpdateRequest.toEntity();
        Optional<Videos> video = videoRepository.findVideosByVid(tempvideo.getVid());

        if (video.isPresent()) {
            video.get().setTitle(tempvideo.getTitle());
            video.get().setUrl(tempvideo.getUrl());
            video.get().setCategory(tempvideo.getCategory());
            video.get().setIsshow(tempvideo.isIsshow());
            video.get().setThumbnail(tempvideo.getThumbnail());

            videoRepository.save(video.get());

            return "success";
        }
        return "fail";
    }

    public String deleteVideos(long vid) {
        Optional<Videos> video = videoRepository.findVideosByVid(vid);

        if (video.isPresent()) {
            videoRepository.deleteById(video.get().getVid());
            return "success";
        }
        return "fail";
    }


    //Read를 하는데..... 어떡하지 그냥 카테고리만 입력 받고 하면 될려나?

}
