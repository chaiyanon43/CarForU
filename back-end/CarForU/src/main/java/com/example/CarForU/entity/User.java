package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "USER")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private int userId;
    @Column(name = "USER_USERNAME")
    private String username;
    @Column(name = "USER_PASSWORD")
    private String password;
    @Column(name = "USER_NAME")
    private String name;
    @Column(name = "USER_PHONE_NUMBER")
    private String phoneNumber;
    @Column(name = "USER_ADDRESS")
    private String address;
    @Column(name = "USER_ROLE")
    private int role;
    @Column(name = "USER_IMAGE")
    private String image;

    public User() {
    }
}
