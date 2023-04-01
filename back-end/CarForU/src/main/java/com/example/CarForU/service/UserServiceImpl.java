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
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

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
        newUser.setStatus(1);
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
    public void BanUser(int userId) {
        userRepository.banUserById(userId);
    }

    @Override
    public void UnbanUser(int userId) {
        userRepository.unbanUserById(userId);
    }

    @Override
    public List<UserDetailResponse> GetAllUser() {
        List<User> users = userRepository.findAllUser();
        List<UserDetailResponse> userDetailResponseList = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            UserDetailResponse userDetailResponse = new UserDetailResponse();
            userDetailResponse.setUserId(users.get(i).getUserId());
            userDetailResponse.setName(users.get(i).getName());
            userDetailResponse.setAddress(users.get(i).getAddress());
            userDetailResponse.setRole(users.get(i).getRole());
            userDetailResponse.setImage(users.get(i).getImage());
            userDetailResponse.setUsername(users.get(i).getUsername());
            userDetailResponse.setPhoneNumber(users.get(i).getPhoneNumber());
            userDetailResponse.setStatus(users.get(i).getStatus());
            userDetailResponseList.add(userDetailResponse);
        }
        return userDetailResponseList;
    }

    @Override
    public UserDetailResponse GetUserDetailForAdmin(int userId) {
        User user = userRepository.findUserById(userId);
        UserDetailResponse userDetailResponse = new UserDetailResponse();
        userDetailResponse.setUserId(user.getUserId());
        userDetailResponse.setName(user.getName());
        userDetailResponse.setUsername(user.getUsername());
        userDetailResponse.setAddress(user.getAddress());
        userDetailResponse.setPhoneNumber(user.getPhoneNumber());
        userDetailResponse.setStatus(user.getStatus());
        userDetailResponse.setImage(user.getImage());
        return userDetailResponse;
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
