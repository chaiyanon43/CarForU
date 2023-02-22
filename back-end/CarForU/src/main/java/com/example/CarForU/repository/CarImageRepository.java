package com.example.CarForU.repository;

import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface CarImageRepository extends JpaRepository<CarImage,Integer> {
    @Query("SELECT i FROM CarImage i WHERE i.car.carId=:carId")
    List<CarImage> findCarImageByCarId(@RequestParam("carId") int carId);
}
