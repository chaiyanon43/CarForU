package com.example.CarForU.service;

import com.example.CarForU.bean.NotificationResponse;

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
