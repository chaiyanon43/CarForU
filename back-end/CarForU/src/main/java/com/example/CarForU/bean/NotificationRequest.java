package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;

@Getter
@Setter
public class NotificationRequest {
    private int userId;
    private String notificationContactType;
    private String notificationContact;
    private int notificationContactor;
    private int carId;
    private String notificationDesc;

    public NotificationRequest() {
    }
}
