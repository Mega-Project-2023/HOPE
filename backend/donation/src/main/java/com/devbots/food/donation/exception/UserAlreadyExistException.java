package com.devbots.food.donation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserAlreadyExistException extends RuntimeException{
    private String message;

    public UserAlreadyExistException(String message) {
        super(message);
    }
}
