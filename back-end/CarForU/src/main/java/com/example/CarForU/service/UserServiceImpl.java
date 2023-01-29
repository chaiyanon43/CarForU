package com.example.CarForU.service;

import com.example.CarForU.entity.User;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.IOException;
import java.util.Base64;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;
    @Override
    public void saveUser(MultipartFile image, String username, String password,String name, String phoneNumber,String address){
        User newUser = new User();
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        if(fileName.contains("..")){
            System.out.println("not a valid file");
        }
        try{
            newUser.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setName(name);
        newUser.setPhoneNumber(phoneNumber);
        newUser.setAddress(address);
        newUser.setRole(2);
        userRepository.save(newUser);
    }
}
