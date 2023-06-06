package com.devbots.food.donation.exception;

public class InSufficientDataException extends RuntimeException{
    private String message;

    public InSufficientDataException(String message) {
        super(message);
    }
}
