package com.example.CarForU.service;

import com.example.CarForU.controller.NotificationResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface NotificationService {
    public void SendNotification(int userId,
                                 String notificationContactType,
                                 String notificationContact,
                                 int notificationContactor,
                                 int carId,
                                 String notificationDesc);
    public List<NotificationResponse> GetNotifications(int userId);
    public NotificationResponse GetNotificationDetail(int notificationId);
}
