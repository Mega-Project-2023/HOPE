package com.devbots.food.donation.exception;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UsernameOrPasswordWrongException extends RuntimeException{
    private String message;

    public UsernameOrPasswordWrongException(String message) {
        super(message);
    }
}
