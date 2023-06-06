package com.devbots.food.donation.service.impl;

import com.devbots.food.donation.dao.AuthDao;
import com.devbots.food.donation.dto.UserDto;
import com.devbots.food.donation.entity.User;
import com.devbots.food.donation.exception.*;
import com.devbots.food.donation.mapper.AuthMapper;
import com.devbots.food.donation.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthDao authDao;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDto login(UserDto user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User existingUser = authDao.findByEmail(user.getEmail()).orElseThrow(()->{
            throw new UserNotFoundException("User not found");
        });

        if("SUSPENDED".equalsIgnoreCase(existingUser.getStatus())) {
            throw new PermissionDeniedException("Permission denied");
        }

        if(!existingUser.getRole().equalsIgnoreCase(user.getRole())) {
            throw new PermissionDeniedException("Permission denied");
        }

        if(!encoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new UsernameOrPasswordWrongException("Username or password is wrong");
        }

        String token = UUID.randomUUID().toString();
        existingUser.setToken(token);
        existingUser = authDao.save(existingUser);

        return AuthMapper.mapToUserDto(existingUser);
    }

    @Override
    public UserDto register(UserDto userDto) {
        Optional<User> existingUser = authDao.findByEmail(userDto.getEmail());

        if(existingUser.isPresent()) {
            throw new UserAlreadyExistException("User already exists with same email address");
        }

        if("ROLE_ADMIN".equals(userDto.getRole())) {
            throw new PermissionDeniedException("Permission denied");
        }
        String userId = UUID.randomUUID().toString();
        userDto.setUserId(userId);
        userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        User currentUser = AuthMapper.mapToUser(userDto);

        User newUser = authDao.save(currentUser);
        return AuthMapper.mapToUserDto(newUser);
    }

    @Override
    public void logout(String userId) {
        User existingUser = authDao.findByUserId(userId).orElseThrow(()->{
            throw new UserNotFoundException("User not found");
        });

        existingUser.setToken("");
        authDao.save(existingUser);
    }

    @Override
    public void authorizeRequest(Map<String,String> requestMap) {
        System.out.println(requestMap);
        UserDto userDto = new UserDto(requestMap.getOrDefault("userid",""),
                                requestMap.getOrDefault("token",""),
                                requestMap.getOrDefault("role",""));
        verifyUser(userDto);

        String authorizedRole = requestMap.getOrDefault("authRole","");
        if(!"".equals(authorizedRole) && !authorizedRole.equals(userDto.getRole())) {
            throw new PermissionDeniedException("Permission denied");
        }
    }

    @Override
    public List<UserDto> getAllUsers(String role) {
        List<User> allUsers = authDao.findAll();
        List<UserDto> allVolunteers = new ArrayList<>();
        for (User user: allUsers) {
            if(role.equalsIgnoreCase(user.getRole())) {
                allVolunteers.add(AuthMapper.mapToUserDto(user));
            }
        }
        return allVolunteers;
    }

    @Override
    public UserDto updateUser(String userId, UserDto userDto) {
        User existingUser = authDao.findByUserId(userId).orElseThrow(()->{
            throw new UserNotFoundException("User not found");
        });

        if(userDto.getPassword() != null)
            existingUser.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

        if(userDto.getEmail() != null)
            existingUser.setEmail(userDto.getEmail());

        if(userDto.getFirstName() != null)
            existingUser.setFirstName(userDto.getFirstName());

        if(userDto.getLastName() != null)
            existingUser.setLastName(userDto.getLastName());

        if(userDto.getRole() != null)
            existingUser.setRole(userDto.getRole());

        if(userDto.getStatus() != null)
            existingUser.setStatus(userDto.getStatus());

        return AuthMapper.mapToUserDto(authDao.save(existingUser));
    }

    @Override
    public UserDto getUserById(String userId) {
        if("".equals(userId)) {
            throw new InSufficientDataException("Required parameters are missing");
        }

        User user = authDao.findByUserId(userId).orElseThrow(() -> {
            throw new UserNotFoundException("User not found");
        });

        return AuthMapper.mapToUserDto(user);
    }

    public void verifyUser(UserDto userDto) {
        String userID = userDto.getUserId().toString();
        String userToken = userDto.getToken().toString();
        String userRole = userDto.getRole().toString();
        if("".equals(userID) || "".equals(userToken) || "".equals(userRole)) {
            throw new RuntimeException("Provide valid data");
        }

        User existingUser = authDao.findByUserId(userID).orElseThrow(()->{
            throw new UserNotFoundException("User not found");
        });

        if("".equals(existingUser.getToken())) {
            throw new PermissionDeniedException("Permission denied");
        }

        if(!( existingUser.getToken().equals(userToken) &&
                existingUser.getRole().equals(userRole))
        ) {
            throw new PermissionDeniedException("Permission denied");
        }
    }
}
