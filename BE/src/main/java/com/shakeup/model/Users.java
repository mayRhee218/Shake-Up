package com.shakeup.model;


import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uid;

    private String id;
    private String password;
    private String email;
    private String name;
    private String profile;
    private String date;

}
