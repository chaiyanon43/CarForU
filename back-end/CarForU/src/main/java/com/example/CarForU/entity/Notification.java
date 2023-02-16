package com.example.CarForU.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "NOTIFICATION")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIFICATION_ID")
    private int notificationId;
    @Column(name = "NOTIFICATION_CONTACTOR")
    private String notificationContactor;
    @Column(name = "NOTIFICATION_PHONE")
    private String notificationPhone;
    @ManyToOne
    @JoinColumn(name = "NOTIFICATION_USER_ID",nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "NOTIFICATION_CAR_ID",nullable = false)
    private Car car;

    public Notification() {
    }
}
