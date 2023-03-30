package com.example.CarForU.controller;

import com.example.CarForU.bean.NotificationRequest;
import com.example.CarForU.bean.NotificationResponse;
import com.example.CarForU.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class NotificationController {
    @Autowired
    NotificationService notificationService;

    @PostMapping("/sendNotification")
    public ResponseEntity<String> SendNotification(@RequestBody NotificationRequest req) {
        notificationService.SendNotification(req.getUserId(), req.getNotificationContactType(), req.getNotificationContact(), req.getNotificationContactor(), req.getCarId(), req.getNotificationDesc());
        return new ResponseEntity<>("ส่งไปยังเจ้าของประกาศเรียบร้อย", HttpStatus.OK);
    }

    @GetMapping("/getNotifications")
    public ResponseEntity<List<NotificationResponse>> GetNotifications(@RequestParam("userId") int userId) {
        return new ResponseEntity<>(notificationService.GetNotifications(userId), HttpStatus.OK);
    }

    @GetMapping("/getNotificationDetail")
    public ResponseEntity<NotificationResponse> GetNotificationDetail(@RequestParam("notificationId") int notificationId) {
        return new ResponseEntity<>(notificationService.GetNotificationDetail(notificationId), HttpStatus.OK);
    }
}
