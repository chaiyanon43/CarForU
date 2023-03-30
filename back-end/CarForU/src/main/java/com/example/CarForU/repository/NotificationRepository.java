package com.example.CarForU.repository;

import com.example.CarForU.entity.Notification;
import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification,Integer> {
    @Query("select n from Notification n where n.user.userId =:userId ORDER BY n.notificationId DESC")
    List<Notification> findNotificationsByUserId(@Param("userId") int userId);
    @Query("select n from Notification n where n.notificationId =:notificationId")
    Notification findNotificationsById(@Param("notificationId") int notificationId);
}
