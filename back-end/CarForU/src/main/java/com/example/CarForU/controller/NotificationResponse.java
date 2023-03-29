package com.example.CarForU.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationResponse {
    private int notificationId;
    private String notificationContactType;
    private String notificationContact;
    private int notificationContactor;
    private int carId;
    private String notificationDesc;
    private String contactorName;
    private String carHeader;
    private String carImage;

    public NotificationResponse() {
    }
}
