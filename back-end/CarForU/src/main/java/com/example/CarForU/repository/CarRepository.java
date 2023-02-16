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
    @Query("SELECT c FROM Car c WHERE c.carCondition ='1' ")
    List<Car> findFirstHandCondition();
    @Query("SELECT c FROM Car c WHERE c.carCondition ='2' ")
    List<Car> findSecondHandCondition();

    @Query("SELECT c FROM Car c WHERE c.carId = :carId and c.carCondition ='1'")
    Car findById(@Param("carId") int carId);

}
