package com.shakeup.repository;


import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserlikeRepository extends JpaRepository< Userlike, Long> {

    List<Userlike> findByUid(int uid);
}
