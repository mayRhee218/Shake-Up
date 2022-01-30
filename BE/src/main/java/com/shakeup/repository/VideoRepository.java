package com.shakeup.repository;

import com.shakeup.model.Videos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<Videos, Long> {
    Optional<Videos> findVideosByVid(long vid);

    Optional<Videos> findVideosByVidAndCategory(long vid, int category);

    Optional<Videos> findByVidAndUid(long vid, int uid);

    Videos findByVid(Long vid);
}
