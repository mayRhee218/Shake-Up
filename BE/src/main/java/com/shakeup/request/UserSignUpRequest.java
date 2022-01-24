package com.shakeup.request;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserSignUpRequest {

    @NotNull
    String id;
    @NotNull
    String name;
    @NotNull
    String email;
    @NotNull
    String password;
    String profile;
    @NotNull
    String date;

    public Users toEntity(){
        return Users.builder()
                .id(id)
                .name(name)
                .email(email)
                .password(password)
                .profile(profile)
                .date(date)
                .build();
    }
}