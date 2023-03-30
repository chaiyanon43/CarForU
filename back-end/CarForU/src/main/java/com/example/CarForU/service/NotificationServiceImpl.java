package com.example.CarForU.service;

import com.example.CarForU.bean.NotificationResponse;
import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarImage;
import com.example.CarForU.entity.Notification;
import com.example.CarForU.entity.User;
import com.example.CarForU.repository.CarImageRepository;
import com.example.CarForU.repository.CarRepository;
import com.example.CarForU.repository.NotificationRepository;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    CarRepository carRepository;
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    CarImageRepository carImageRepository;
    @Override
    public void SendNotification(int userId, String notificationContactType, String notificationContact, int notificationContactor, int carId, String notificationDesc) {
        Notification notification = new Notification();
        User user = userRepository.findUserById(userId);
        Car car = carRepository.findById(carId);
        notification.setUser(user);
        notification.setCar(car);
        notification.setNotificationContactType(notificationContactType);
        notification.setNotificationContact(notificationContact);
        notification.setNotificationDesc(notificationDesc);
        notification.setNotificationContactorId(notificationContactor);
        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationResponse> GetNotifications(int userId) {
        List<Notification> notification = notificationRepository.findNotificationsByUserId(userId);
        List<NotificationResponse> notificationResponses = new ArrayList<>();
        for (int i = 0; i < notification.size(); i++) {
            NotificationResponse notificationResponse = new NotificationResponse();
            User user = userRepository.findUserById(notification.get(i).getNotificationContactorId());
            notificationResponse.setNotificationId(notification.get(i).getNotificationId());
            notificationResponse.setContactorName(user.getName());
            notificationResponses.add(notificationResponse);
        }
        return notificationResponses;
    }

    @Override
    public NotificationResponse GetNotificationDetail(int notificationId) {
        Notification nor = notificationRepository.findNotificationsById(notificationId);
        NotificationResponse res = new NotificationResponse();
        User user = userRepository.findUserById(nor.getNotificationContactorId());
        res.setNotificationId(nor.getNotificationId());
        res.setNotificationContactType(nor.getNotificationContactType());
        res.setNotificationContact(nor.getNotificationContact());
        res.setNotificationContactor(nor.getNotificationContactorId());
        res.setCarHeader(nor.getCar().getCarHeader());
        res.setCarId(nor.getCar().getCarId());
        res.setNotificationDesc(nor.getNotificationDesc());
        res.setContactorName(user.getName());
        List<CarImage> carImage = carImageRepository.findCarImageByCarId(nor.getCar().getCarId());
        res.setCarImage(carImage.get(0).getCarImage());
        return res;
    }

}
