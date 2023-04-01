package com.example.CarForU.service;

import com.example.CarForU.bean.UserDetailResponse;
import com.example.CarForU.bean.UserProfileResponse;
import com.example.CarForU.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    void saveUser(MultipartFile image, String username, String password, String name, String phoneNumber, String address);
    UserProfileResponse getUserProfile(String userId);
    UserDetailResponse getUserDetail(String username);
    void updateUser(MultipartFile image, String username, String name, String phoneNumber, String address,int userId);
    void updateUserWithOut(String username, String name, String phoneNumber, String address,int userId);
    int getUserId(String username);
    void BanUser(int userId);
    void UnbanUser(int userId);
    List<UserDetailResponse> GetAllUser();
    UserDetailResponse GetUserDetailForAdmin(int userId);
}
