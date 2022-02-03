package com.shakeup.request.video;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shakeup.model.Tag;
import com.shakeup.model.Videos;
import com.shakeup.request.tag.TagCreateRequest;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.Column;
import java.util.List;

@Getter
public class VideoCreateRequest {
    @NotNull
    int uid;
    @NotNull
    String title;
    @NotNull
    String url;
    @NotNull
    int category;
<<<<<<< HEAD
    int isshow;
=======
    boolean isshow;
    String content;
>>>>>>> feature/BE/axiostest
    String thumbnail;
    boolean iscomment;
    int score;
    List<VideoTagRequest> tag;

    public Videos toEntity() {
        return Videos.builder()
                .uid(uid)
                .title(title)
                .url(url)
                .category(category)
                .isshow(isshow)
<<<<<<< HEAD
=======
                .content(content)
>>>>>>> feature/BE/axiostest
                .thumbnail(thumbnail)
                .iscomment(iscomment)
                .score(score)
                .build();

    }

}
