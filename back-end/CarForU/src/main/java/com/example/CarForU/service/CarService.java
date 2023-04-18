package com.example.CarForU.service;

import com.example.CarForU.bean.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {
    EuclideanResultListResponse CarRecommendation(int carId, String condition);

    ResponseEntity<CarDetailAndRec> GetCarDetail(int carId);

    ResponseEntity<CarDetailForAdmin> GetCarDetailForAdmin(int carId);

    List<CarDetailCard> GetAllFirstHandCars(int status);

    List<CarDetailCard> GetAllBanedCar();

    List<CarDetailCard> GetAllFirstHandCarsSearch(String keyword,
                                                  String[] carPrice,
                                                  String[] carYear,
                                                  String carFuelType,
                                                  List<String> carBrands,
                                                  List<String> carModels,
                                                  double carSeats,
                                                  String carGear,
                                                  int status);

    List<CarDetailCard> GetAllSecondHandCarsSearch(String keyword,
                                                   String[] carPrice,
                                                   String[] carYear,
                                                   String carFuelType,
                                                   List<String> carBrands,
                                                   List<String> carModels,
                                                   double carSeats,
                                                   String carGear,
                                                   String[] carMileage,
                                                   int status);

    List<CarDetailCard> GetAllSecondHandCars(int status);

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

    void BanCar(int carId);

    void UnBanCar(int carId);

    void DeleteCar(int carId);

    List<CarDetailTable> GetCarDetailTable(int userId);
}
