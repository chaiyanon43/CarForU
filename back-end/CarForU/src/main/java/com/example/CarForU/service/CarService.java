package com.example.CarForU.service;

import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.EuclideanResultListResponse;

import java.util.List;

public interface CarService {
    EuclideanResultListResponse CarRecommendation(int carId);
    List<CarsAllResponse> GetAllFirstHandCars();
    List<CarsAllResponse> GetAllSecondHandCars();
}
