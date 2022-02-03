package com.shakeup.repository;

import com.shakeup.model.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Videos, Long> {
    Optional<Videos> findVideosByVid(long vid);
    Optional<Videos> findByVidAndUid(long vid, int uid);
    Videos findByVid(Long vid);
    List<Videos> findVideosByCategory(int category);
    List<Videos> findAll();
    List<Videos> findVideosByUid(int uid);



}
