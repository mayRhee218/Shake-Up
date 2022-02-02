package com.shakeup.request.user;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

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
<<<<<<< HEAD:BE/src/main/java/com/shakeup/request/UserSignUpRequest.java
    String profile;
=======
>>>>>>> 8b73a4dbe918dd13490931d75c9f32684c589df0:BE/src/main/java/com/shakeup/request/user/UserSignUpRequest.java

//    String profile;

    public Users toEntity() {
        return Users.builder()
                .id(id)
                .name(name)
                .email(email)
                .password(password)
<<<<<<< HEAD:BE/src/main/java/com/shakeup/request/UserSignUpRequest.java
                .profile(profile)
=======
//                .profile(profile)
>>>>>>> 8b73a4dbe918dd13490931d75c9f32684c589df0:BE/src/main/java/com/shakeup/request/user/UserSignUpRequest.java
                .build();
    }
}