package com.example.CarForU.service;

import com.example.CarForU.bean.CarDetailAndRec;
import com.example.CarForU.bean.CarDetailCard;
import com.example.CarForU.bean.CarDetailEdit;
import com.example.CarForU.bean.EuclideanResultListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {
    EuclideanResultListResponse CarRecommendation(int carId, String condition);

    CarDetailAndRec GetCarDetail(int carId);
    List<CarDetailCard> GetAllFirstHandCars();

    List<CarDetailCard> GetAllFirstHandCarsSearch(String keyword,
                                            String[] carPrice,
                                            String[] carYear,
                                            String carFuelType,
                                            List<String> carBrands,
                                            List<String> carModels,
                                            double carSeats,
                                            String carGear);
    List<CarDetailCard> GetAllSecondHandCarsSearch(String keyword,
                                                  String[] carPrice,
                                                  String[] carYear,
                                                  String carFuelType,
                                                  List<String> carBrands,
                                                  List<String> carModels,
                                                  double carSeats,
                                                  String carGear,
                                                   double carMileage);

    List<CarDetailCard> GetAllSecondHandCars();

    List<CarDetailCard> GetMyCars(String username);

    ResponseEntity<CarDetailEdit> GetCarDetailForEdit(int carId, int userId);

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
                int userId,
                List<MultipartFile> carImage,
                List<MultipartFile> carImageDefect
    );

    void EditCarData(
            String carAddress,
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
            List<MultipartFile> carImage,
            List<MultipartFile> carImageDefect,
            int[] carImageIdDelete,
            int carId
    );
}
