package com.example.CarForU.service;

import com.example.CarForU.bean.UserDetailResponse;
import com.example.CarForU.bean.UserProfileResponse;
import com.example.CarForU.entity.User;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Base64;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public void saveUser(MultipartFile image, String username, String password, String name, String phoneNumber, String address) {
        User newUser = new User();
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        if (fileName.contains("..")) {
            System.out.println("not a valid file");
        }
        try {
            newUser.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setName(name);
        newUser.setPhoneNumber(phoneNumber);
        newUser.setAddress(address);
        newUser.setRole("user");

        userRepository.save(newUser);
    }

    @Override
    public UserProfileResponse getUserProfile(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        UserProfileResponse userRes = new UserProfileResponse();
        userRes.setName(user.getName());
        userRes.setImage(user.getImage());
        return userRes;
    }

    @Override
    public UserDetailResponse getUserDetail(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        UserDetailResponse userDetailResponse = new UserDetailResponse();
        userDetailResponse.setUserId(user.getUserId());
        userDetailResponse.setName(user.getName());
        userDetailResponse.setAddress(user.getAddress());
        userDetailResponse.setRole(user.getRole());
        userDetailResponse.setImage(user.getImage());
        userDetailResponse.setUsername(user.getUsername());
        userDetailResponse.setPhoneNumber(user.getPhoneNumber());
        return userDetailResponse;
    }

    @Override
    public void updateUser(MultipartFile image, String username, String name, String phoneNumber, String address, int userId) {
        User newUser = new User();
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        if (fileName.contains("..")) {
            System.out.println("not a valid file");
        }
        try {
            newUser.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
        } catch (IOException e) {
        }
        userRepository.updateUser(username, name, phoneNumber, address, newUser.getImage(), userId);

    }

    @Override
    public void updateUserWithOut(String username, String name, String phoneNumber, String address, int userId) {
        userRepository.updateUserWithOutImage(username, name, phoneNumber, address, userId);
    }

    @Override
    public int getUserId(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        return user.getUserId();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with -> username or email : " + username)
                );

        return UserPrinciple.build(user);
    }
}
