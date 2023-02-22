package com.example.CarForU.controller;

import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.CarForRec;
import com.example.CarForU.bean.EuclideanResultListResponse;
import com.example.CarForU.service.CarImageService;
import com.example.CarForU.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Entity;
import java.util.List;

@RestController
public class CarController {

    @Autowired
    CarService carService;
    @Autowired
    CarImageService carImageService;


    @GetMapping("/rec-func1")
    public ResponseEntity<EuclideanResultListResponse> RecommendCarFunc1(@RequestParam("carId") int carId){
        CarForRec carForRec = new CarForRec();
        EuclideanResultListResponse EuclideanData = carService.CarRecommendation(carId);
        return new ResponseEntity<EuclideanResultListResponse>(EuclideanData, HttpStatus.OK);
    }

    @GetMapping("/all-first-hand-car")
    public ResponseEntity<List<CarsAllResponse>> GetFirstHandCars(){
        return new ResponseEntity<>(carService.GetAllFirstHandCars(), HttpStatus.OK);
    }
    @GetMapping("/all-second-hand-car")
    public ResponseEntity<List<CarsAllResponse>> GetSecondHandCars(){
        return new ResponseEntity<>(carService.GetAllSecondHandCars(), HttpStatus.OK);
    }
    @PostMapping("/add-car")
    public ResponseEntity<String> saveCar(
            @RequestParam("carAddress") String carAddress,
            @RequestParam("carBrandName") String carBrandName,
            @RequestParam("carColor") String carColor,
            @RequestParam("carCondition") String carCondition,
            @RequestParam("carDesc") String carDesc,
            @RequestParam("carEVRange") double carEVRange,
            @RequestParam("carFuelConsumption") double carFuelConsumption,
            @RequestParam("carFuelType") String carFuelType,
            @RequestParam("carGas") Boolean carGas,
            @RequestParam("carGearType") String carGearType,
            @RequestParam("carHorsePower") double carHorsePower,
            @RequestParam("carImage") MultipartFile[] carImage,
            @RequestParam("carImageDefect") MultipartFile[] carImageDefect,
            @RequestParam("carMileage") double carMileage,
            @RequestParam("carModelName") String carModelName,
            @RequestParam("carPrice") double carPrice,
            @RequestParam("carSeats") double carSeats,
            @RequestParam("carYear") double carYear,
            @RequestParam("carId") int carId
                                           ){
        carImageService.AddCarImage(carImage,carId);
        return new ResponseEntity<>("Car image Added", HttpStatus.OK);
    }
}
