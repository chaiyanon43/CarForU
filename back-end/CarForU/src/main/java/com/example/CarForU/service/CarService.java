package com.example.CarForU.service;

import com.example.CarForU.bean.CarDetailAndRec;
import com.example.CarForU.bean.CarDetailCard;
import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.EuclideanResultListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {
    EuclideanResultListResponse CarRecommendation(int carId,String condition);
    CarDetailAndRec GetCarDetail(int carId);

    List<CarDetailCard> GetAllFirstHandCars();

    List<CarDetailCard> GetAllSecondHandCars();
    List<CarDetailCard> GetMyCars(String username);

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
                double carMileage,
                String carModelName,
                double carPrice,
                double carSeats,
                double carYear,
                String carHeader,
                int carId,
                List<MultipartFile> carImage,
                List<MultipartFile> carImageDefect
    );
}
