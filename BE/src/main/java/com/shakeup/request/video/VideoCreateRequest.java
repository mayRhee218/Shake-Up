package com.shakeup.request.video;

import com.shakeup.model.Videos;
import com.sun.istack.NotNull;
import lombok.Getter;

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
    int show;
    String thumbnail;
    int comment;

    public Videos toEntity(){
        return  Videos.builder()
                .uid(uid)
                .title(title)
                .url(url)
                .category(category)
                .show(show)
                .thumbnail(thumbnail)
                .comment(comment)
                .build();

    }

}
