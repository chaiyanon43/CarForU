package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailResponse {
    private int userId;
    private String username;
    private String name;
    private String phoneNumber;
    private String address;
    private String role;
    private String image;
    private int status;

    public UserDetailResponse() {
    }
}
