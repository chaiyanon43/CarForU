package com.example.CarForU.service;

import com.example.CarForU.bean.UserProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void saveUser(MultipartFile image, String username, String password, String name, String phoneNumber, String address);
    UserProfileResponse getUserProfile(String userId);
}
