package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "USER")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private int userId;
    @Column(name = "USER_USERNAME",unique = true)
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
    private String role;
    @Lob
    @Column(name = "USER_IMAGE",columnDefinition = "MEDIUMBLOB")
    private String image;
    @OneToMany(mappedBy = "user")
    private Set<Car> cars;
    @OneToMany(mappedBy = "user")
    private Set<Notification> notifications;
    @OneToMany(mappedBy = "user")
    Set<CarLikes> carLikes;


    public User() {
    }

}
