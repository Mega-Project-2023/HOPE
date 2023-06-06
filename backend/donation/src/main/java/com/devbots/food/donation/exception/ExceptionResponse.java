package com.devbots.food.donation.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExceptionResponse {
    private LocalDateTime timeStamp;
    private String message;
    private String description;
    private String errorCode;
}
