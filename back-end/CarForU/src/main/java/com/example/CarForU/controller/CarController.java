package com.example.CarForU.controller;

import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.CarForRec;
import com.example.CarForU.bean.EuclideanResultListResponse;
import com.example.CarForU.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CarController {

    @Autowired
    CarService carService;

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
}
