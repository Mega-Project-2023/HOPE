package com.devbots.food.donation.mapper;

import com.devbots.food.donation.dto.UserDto;
import com.devbots.food.donation.entity.User;

public class AuthMapper {

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setRole(user.getRole());
        userDto.setEmail(user.getEmail());
        userDto.setToken(user.getToken());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        return userDto;
    }

    public static User mapToUser(UserDto userdto) {
        User user = new User();
        user.setUserId(userdto.getUserId());
        user.setRole(userdto.getRole());
        user.setEmail(userdto.getEmail());
        user.setFirstName(userdto.getFirstName());
        user.setLastName(userdto.getLastName());
        user.setPassword(userdto.getPassword());
        return user;
    }
}
