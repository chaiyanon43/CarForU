package com.example.CarForU.controller;

import com.example.CarForU.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {
    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;
    @PostMapping("/addUser")
    public ResponseEntity<String> saveUser(@RequestParam("image") MultipartFile image,
                                           @RequestParam("username") String username,
                                           @RequestParam("password") String password,
                                           @RequestParam("name") String name,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("address") String address){
        userService.saveUser(image, username, password, name, phoneNumber, address);
        return new ResponseEntity<>("User Added", HttpStatus.OK);
    }
}
