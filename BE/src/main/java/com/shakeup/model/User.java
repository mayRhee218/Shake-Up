package com.shakeup.model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@Table(name = "users")
public class User {
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
