package com.shakeup.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Videos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="vid",columnDefinition = "INT")
    private long vid;

    private int uid;
    private String title;
    private int like; //좋아요 수
    private int views; //조회 수
    private String url; //영상 url
    private int show; //공개 여부, DB의 tinyint는 0과 1로 반환되기 때문에 boolean이 아니라 int로 잡았다(0:false, 1:true)
    private int category;//0 : 일반 영상, 1 : 댄스 따라하기 영상, 2: 유저가 따라한 영상
    private String thumbnail; //사진 url
    private LocalDateTime date;
    private int comment;
    private int score;

    @PrePersist
    public void createAt() {
        this.date = LocalDateTime.now();
    }
}
