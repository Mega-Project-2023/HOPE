package com.devbots.food.donation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
@RestController
public class AuthExceptionController extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = PermissionDeniedException.class)
    public ResponseEntity<Object> exception(PermissionDeniedException e, WebRequest request) {
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "UNAUTHORIZED");
        return new ResponseEntity(exceptionResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = UsernameOrPasswordWrongException.class)
    public ResponseEntity<Object> exception(UsernameOrPasswordWrongException e, WebRequest request) {
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "BAD_REQUEST");
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<Object> exception(UserNotFoundException e, WebRequest request) {
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "NOT_FOUND");
        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = UserAlreadyExistException.class)
    public ResponseEntity<Object> exception(UserAlreadyExistException e, WebRequest request) {
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "BAD_REQUEST");
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = InSufficientDataException.class)
    public ResponseEntity<Object> exception(InSufficientDataException e, WebRequest request) {
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "PARTIAL_CONTENT");
        return new ResponseEntity(exceptionResponse, HttpStatus.PARTIAL_CONTENT);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception e, WebRequest request) {
        System.out.println("Exception in handle all exception");
        e.printStackTrace();
        ExceptionResponse exceptionResponse= new ExceptionResponse(
                LocalDateTime.now(),
                e.getMessage(),
                request.getDescription(false),
                "INTERNAL_SERVER_ERROR");
        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
