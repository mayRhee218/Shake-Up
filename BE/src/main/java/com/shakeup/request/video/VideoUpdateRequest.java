package com.shakeup.request.video;

import com.shakeup.model.Videos;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class VideoUpdateRequest {
    @NotNull
    int vid;
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
>>>>>>> feature/BE/axiostest
    String thumbnail;
    int comment;

    public Videos toEntity(){
        return  Videos.builder()
                .vid(vid)
                .title(title)
                .url(url)
                .category(category)
                .isshow(isshow)
                .thumbnail(thumbnail)
//                .comment(comment)
                .build();

    }
}
