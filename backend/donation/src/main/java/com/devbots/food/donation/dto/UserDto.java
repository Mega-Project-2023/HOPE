package com.devbots.food.donation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private String token;
    private String status;

    public UserDto(String userId, String token, String role) {
        this.userId = userId;
        this.role = role;
        this.token = token;
    }
}
