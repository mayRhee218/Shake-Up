package com.shakeup.repository;

import com.shakeup.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findById(String id);
    Optional<Users> findByUid(Long uid);
}
