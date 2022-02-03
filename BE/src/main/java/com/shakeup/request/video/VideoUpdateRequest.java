package com.shakeup.request.video;

import com.shakeup.model.Videos;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class VideoUpdateRequest {
    @NotNull
    String title;
    @NotNull
    String url;
    @NotNull
    int category;

    boolean isshow;
    String thumbnail;
    int comment;

    public Videos toEntity(){
        return  Videos.builder()
                .title(title)
                .url(url)
                .category(category)
                .isshow(isshow)
                .thumbnail(thumbnail)
//                .comment(comment)
                .build();

    }
}
