package com.shakeup.service;

import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import com.shakeup.request.video.VideoCreateRequest;
import com.shakeup.request.video.VideoMyCategoryRequest;
import com.shakeup.request.video.VideoUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    //영상 DB저장
    public String createVideo(VideoCreateRequest videoCreateRequest) {
        Videos temp = videoCreateRequest.toEntity();
        System.out.println(videoCreateRequest.getTag());
        try {
            videoRepository.save(temp);
            return "success";
        } catch (Exception e) {
            return "fail";
        }

    }

    public String upadateVideo(VideoUpdateRequest videoUpdateRequest) {
        Videos temp = videoUpdateRequest.toEntity();
        Optional<Videos> video = videoRepository.findVideosByVid(temp.getVid());

        if (video.isPresent()) {
            video.get().setTitle(temp.getTitle());
            video.get().setUrl(temp.getUrl());
            video.get().setCategory(temp.getCategory());
            video.get().setIsshow(temp.isIsshow());
            video.get().setThumbnail(temp.getThumbnail());

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

    //전체 영상 가져오기
    public List<Videos> readAllVideo() {
        try {
            List<Videos> video = videoRepository.findAll();
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Videos> readCategoryVideo(int category) {
        try {
            List<Videos> video = videoRepository.findVideosByCategory(category);
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    public Optional<Videos> readOneVideo(long vid) {
        try {
            Optional<Videos> video = videoRepository.findVideosByVid(vid);
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Videos> readMyCategoryVideo(VideoMyCategoryRequest videoMyCategoryRequest) {
        Videos temp = videoMyCategoryRequest.toEntity();
        try {
            List<Videos> video = videoRepository.findVideosByUidAndCategory(temp.getUid(),temp.getCategory());
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    public List<Videos> readMylikeVideo(UserlikeCreateRequest userlikeCreateRequest) {


        return null;
    }
    //Read를 하는데..... 어떡하지 그냥 카테고리만 입력 받고 하면 될려나?

}
