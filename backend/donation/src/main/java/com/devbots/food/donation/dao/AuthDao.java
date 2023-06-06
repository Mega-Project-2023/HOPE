package com.devbots.food.donation.dao;

import com.devbots.food.donation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthDao extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(String userId);
    Optional<User> findByEmail(String email);
}
