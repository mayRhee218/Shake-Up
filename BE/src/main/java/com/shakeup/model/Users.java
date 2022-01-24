package com.shakeup.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity // JPA -> 테이블과 매핑할 클래스에 지정 (기본값 : 클래스 이름)
@Data   // JPA -> Getter, Setter 사용
//@Table    // Entity를 사용하면 필요없음
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Users {
    @Id // JPA -> 기본키 매핑
    // JPA -> 기본키 생성을 DB에 위임, id 값을 null로하면 DB가 알아서 AUTO_INCREMENT
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uid;

    private String id;
    private String password;
    private String email;
    private String name;
    private String profile;
    private String date;
}
