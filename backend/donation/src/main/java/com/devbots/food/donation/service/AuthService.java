package com.devbots.food.donation.service;

import com.devbots.food.donation.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface AuthService {
    public UserDto login(UserDto user);

    UserDto register(UserDto user);

    void logout(String userId);

    void authorizeRequest(Map<String, String> userDto);

    List<UserDto> getAllUsers(String role);

    UserDto updateUser(String userId, UserDto userDto);

    UserDto getUserById(String userId);
}
