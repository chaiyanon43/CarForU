package com.example.CarForU.controller;

import com.example.CarForU.bean.UserProfileResponse;
import com.example.CarForU.jwt.JwtProvider;
import com.example.CarForU.jwt.JwtResponse;
import com.example.CarForU.jwt.LoginForm;
import com.example.CarForU.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {
    Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    private UserService userService;
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/addUser")
    public ResponseEntity<String> saveUser(@RequestParam("image") MultipartFile image,
                                           @RequestParam("username") String username,
                                           @RequestParam("password") String password,
                                           @RequestParam("name") String name,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("address") String address) {
        userService.saveUser(image, username, encoder.encode(password), name, phoneNumber, address);
        return new ResponseEntity<>("User Added", HttpStatus.OK);
    }

    @GetMapping("/login")
    public String getPwd() {
        return encoder.encode("123456789");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @GetMapping("/userProfile")
    public ResponseEntity<UserProfileResponse> getUserProfile(@RequestParam("username") String username) {
        return new ResponseEntity<>(userService.getUserProfile(username), HttpStatus.OK);
    }

}
