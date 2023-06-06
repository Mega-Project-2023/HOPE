package com.devbots.food.donation.controller;

import com.devbots.food.donation.dto.UserDto;
import com.devbots.food.donation.exception.PermissionDeniedException;
import com.devbots.food.donation.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private DonationController donationController;

    /*----  COMMON METHODS  ----*/
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto user) {
        UserDto loggedInUser = authService.login(user);
        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

    @PutMapping("/logout")
    public ResponseEntity<UserDto> logout(@RequestHeader Map<String,String> headers) {
        try {
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        authService.logout(headers.getOrDefault("userid",""));
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/verify-permissions")
    public ResponseEntity<String> authoriseRequest(@RequestBody Map<String, String> requestBody) {
        authService.authorizeRequest(requestBody);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/user/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable String userId, @RequestHeader Map<String,String> headers) {
        try {
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        if(!headers.getOrDefault("userid","").equals(userId)) {
            throw new PermissionDeniedException("Permission denied");
        }
        UserDto newVolunteer = authService.updateUser(userId, userDto);
        return new ResponseEntity<>(newVolunteer, HttpStatus.OK);
    }

    @GetMapping("/get/user/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String userId, @RequestHeader Map<String,String> headers) {
        try {
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        if("ROLE_USER".equalsIgnoreCase(headers.getOrDefault("role","")) && !headers.getOrDefault("userid","").equals(userId)) {
            throw new PermissionDeniedException("Permission denied");
        }
        UserDto newVolunteer = authService.getUserById(userId);
        return new ResponseEntity<>(newVolunteer, HttpStatus.OK);
    }


    /*----  USER METHODS  ----*/
    @PostMapping("/register/user")
    public ResponseEntity<UserDto> register(@RequestBody UserDto user) {
        UserDto newUser = authService.register(user);
        return  new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }


    /*----  ADMIN METHODS  ----*/
    @GetMapping("/get-all/{userRole}")
    public ResponseEntity<List<UserDto>> getAllUsers(@RequestHeader Map<String,String> headers, @PathVariable("userRole") String role) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        List<UserDto> allVolunteers = authService.getAllUsers(role);
        return new ResponseEntity<>(allVolunteers, HttpStatus.OK);
    }

    @PostMapping("/add-new/volunteer")
    public ResponseEntity<UserDto> addNewVolunteer(@RequestBody UserDto userDto, @RequestHeader Map<String,String> headers) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        UserDto newVolunteer = authService.register(userDto);
        return new ResponseEntity<>(newVolunteer, HttpStatus.OK);
    }

    @PutMapping("/suspend/user/{userId}")
    public ResponseEntity<UserDto> suspendUser(@RequestBody UserDto userDto, @PathVariable String userId, @RequestHeader Map<String,String> headers) {
        try {
            headers.put("authRole","ROLE_ADMIN");
            authoriseRequest(headers);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        UserDto newVolunteer = authService.updateUser(userId, userDto);
        return new ResponseEntity<>(newVolunteer, HttpStatus.OK);
    }

}
