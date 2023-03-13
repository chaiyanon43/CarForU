package com.example.CarForU.repository;

import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarLikes;
import com.example.CarForU.entity.CarLikesKey;
import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CarLikesRepository extends JpaRepository<CarLikes,Integer> {
    @Query("select l from CarLikes l where l.user =:user")
    List<CarLikes> findCarLikesByUser(@Param("user") User user);
    @Query("select l.car.carId from CarLikes l where l.user =:user")
    List<Integer> findCarLikesIdByUser(@Param("user") User user);
    @Modifying
    @Transactional
    @Query("delete from CarLikes l where l.user =:user and l.car =:car")
    void deleteCarLikesByCarAndUser(@Param("car") Car car,@Param("user") User user);
}
