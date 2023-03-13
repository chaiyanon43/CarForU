package com.example.CarForU.controller;

import com.example.CarForU.bean.*;
import com.example.CarForU.service.CarImageService;
import com.example.CarForU.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

@RestController
public class CarController {

    @Autowired
    CarService carService;
    @Autowired
    CarImageService carImageService;


//    @GetMapping("/rec-func1")
//    public ResponseEntity<EuclideanResultListResponse> RecommendCarFunc1(@RequestParam("carId") int carId) {
//        CarForRec carForRec = new CarForRec();
//        EuclideanResultListResponse EuclideanData = carService.CarRecommendation(carId);
//        return new ResponseEntity<EuclideanResultListResponse>(EuclideanData, HttpStatus.OK);
//    }

    @GetMapping("/all-first-hand-car")
    public ResponseEntity<List<CarDetailCard>> GetFirstHandCars() {
        return new ResponseEntity<>(carService.GetAllFirstHandCars(), HttpStatus.OK);
    }
    @GetMapping("/getCar")
    public ResponseEntity<CarDetailAndRec> GetCarDetail(@RequestParam("carId") int carId){
        return new ResponseEntity<>(carService.GetCarDetail(carId), HttpStatus.OK);
    }
    @GetMapping("myCars")
    public ResponseEntity<List<CarDetailCard>> GetMyCars(@RequestParam("username") String username){
        return new ResponseEntity<>(carService.GetMyCars(username),HttpStatus.OK);
    }

    @GetMapping("/all-second-hand-car")
    public ResponseEntity<List<CarDetailCard>> GetSecondHandCars() {
        return new ResponseEntity<>(carService.GetAllSecondHandCars(), HttpStatus.OK);
    }

    @PostMapping("/add-car")
    public ResponseEntity<String> saveCar(
            @RequestParam(name = "carAddress") String carAddress,
            @RequestParam(name = "carBrand") String carBrand,
            @RequestParam(name = "carColor") String carColor,
            @RequestParam(name = "carCondition") String carCondition,
            @RequestParam(name = "carDesc") String carDesc,
            @RequestParam(name = "carEVRange") double carEVRange,
            @RequestParam(name = "carFuelConsumption") double carFuelConsumption,
            @RequestParam(name = "carFuelType") String carFuelType,
            @RequestParam(name = "carGas") Boolean carGas,
            @RequestParam(name = "carGearType") String carGearType,
            @RequestParam(name = "carHorsePower") double carHorsePower,
            @RequestParam(name = "carMileage") double carMileage,
            @RequestParam(name = "carImage") List<MultipartFile> carImage,
            @RequestParam(name = "carImageDefect",required = false) List<MultipartFile> carImageDefect,
            @RequestParam(name = "carModel") String carModel,
            @RequestParam(name = "carPrice") double carPrice,
            @RequestParam(name = "carSeats") double carSeats,
            @RequestParam(name = "carYear") double carYear,
            @RequestParam(name = "carHeader") String carHeader,
            @RequestParam(name = "carId") int carId
    ) {
        try{
                carService.AddCar(
                        carAddress,
                        carBrand,
                        carColor,
                        carCondition,
                        carDesc,
                        carEVRange,
                        carFuelConsumption,
                        carFuelType, carGas,
                        carGearType,
                        carHorsePower,
                        carMileage,
                        carModel,
                        carPrice,
                        carSeats,
                        carYear,
                        carHeader,
                        carId,
                        carImage,
                        carImageDefect);
        }catch (Exception e){
            System.out.println(e);
        }
        return new ResponseEntity<>("Car Added", HttpStatus.OK);
    }
}
