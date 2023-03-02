package com.example.CarForU.repository;

import com.example.CarForU.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car,Integer> {
    @Query("SELECT c FROM Car c WHERE c.carCondition ='มือหนึ่ง' ")
    List<Car> findFirstHandCondition();
    @Query("SELECT c FROM Car c WHERE c.carCondition ='มือสอง' ")
    List<Car> findSecondHandCondition();

    @Query("SELECT c FROM Car c WHERE c.carId = :carId")
    Car findById(@Param("carId") int carId);
    @Query("SELECT c FROM Car c where c.carId = :carId")
    Car findRecCarById(@Param("carId")int carId);

}
