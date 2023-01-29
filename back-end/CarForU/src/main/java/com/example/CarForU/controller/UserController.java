package com.example.CarForU.controller;

import com.example.CarForU.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/addUser")
    public String saveUser(@RequestParam("image") MultipartFile image,
                           @RequestParam("username") String username,
                           @RequestParam("password") String password,
                           @RequestParam("name") String name,
                           @RequestParam("phoneNumber") String phoneNumber,
                           @RequestParam("address") String address){
        userService.saveUser(image, username, password, name, phoneNumber, address);
        return "User are added.";
    }
}
