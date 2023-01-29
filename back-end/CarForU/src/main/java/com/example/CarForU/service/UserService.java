package com.example.CarForU.service;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void saveUser(MultipartFile image, String username, String password, String name, String phoneNumber, String address);
}
