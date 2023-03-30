package com.example.CarForU.repository;

import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CarImageRepository extends JpaRepository<CarImage,Integer> {
    @Query("SELECT i FROM CarImage i WHERE i.car.carId=:carId")
    List<CarImage> findCarImageByCarId(@RequestParam("carId") int carId);
    @Query("SELECT i FROM CarImage i WHERE i.car.carId=:carId AND i.carImageStatus = 1")
    List<CarImage> findCarImageByCarIdWhereStatusOne(@RequestParam("carId") int carId);
    @Query("SELECT i FROM CarImage i WHERE i.car.carId=:carId AND i.carImageStatus = 2")
    List<CarImage> findCarImageByCarIdWhereStatusTwo(@RequestParam("carId") int carId);
    @Modifying
    @Transactional
    @Query("delete from CarImage cm where cm.carImageId = :carImageId")
    void DeleteCarImageByID(@Param("carImageId") int carImageId);
}
