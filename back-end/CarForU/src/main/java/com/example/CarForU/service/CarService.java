package com.example.CarForU.service;

import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.EuclideanResultListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {
    EuclideanResultListResponse CarRecommendation(int carId);

    List<CarsAllResponse> GetAllFirstHandCars();

    List<CarsAllResponse> GetAllSecondHandCars();

    void AddCar(String carAddress,
                String carBrandName,
                String carColor,
                String carCondition,
                String carDesc,
                double carEVRange,
                double carFuelConsumption,
                String carFuelType,
                Boolean carGas,
                String carGearType,
                double carHorsePower,
                MultipartFile[] carImage,
                MultipartFile[] carImageDefect,
                double carMileage,
                String carModelName,
                double carPrice,
                double carSeats,
                double carYear);
}
