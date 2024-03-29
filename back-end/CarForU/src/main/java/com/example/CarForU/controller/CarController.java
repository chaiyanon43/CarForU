package com.example.CarForU.controller;

import com.example.CarForU.bean.*;
import com.example.CarForU.entity.Car;
import com.example.CarForU.repository.CarRepository;
import com.example.CarForU.service.CarImageService;
import com.example.CarForU.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Array;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class CarController {

    @Autowired
    CarService carService;
    @Autowired
    CarImageService carImageService;
    @Autowired
    CarRepository carRepository;


//    @GetMapping("/rec-func1")
//    public ResponseEntity<EuclideanResultListResponse> RecommendCarFunc1(@RequestParam("carId") int carId) {
//        CarForRec carForRec = new CarForRec();
//        EuclideanResultListResponse EuclideanData = carService.CarRecommendation(carId);
//        return new ResponseEntity<EuclideanResultListResponse>(EuclideanData, HttpStatus.OK);
//    }

    @GetMapping("/all-first-hand-car")
    public ResponseEntity<List<CarDetailCard>> GetFirstHandCars(@RequestParam(name = "status") int status) {
        return new ResponseEntity<>(carService.GetAllFirstHandCars(status), HttpStatus.OK);
    }

    @PostMapping("/all-first-hand-car-search")
    public ResponseEntity<List<CarDetailCard>> GetFirstHandCarsSearch(
            @RequestParam(name = "searchKeyword" , required = false) String keyword,
            @RequestParam(name = "carPrice", required = false, defaultValue = "0,20000000") String[] carPrice,
            @RequestParam(name = "carYear", required = false, defaultValue = "0,3000") String[] carYear,
            @RequestParam(name = "carFuelType", required = false) String carFuelType,
            @RequestParam(name = "carBrands", required = false, defaultValue = "") String[] carBrands,
            @RequestParam(name = "carModels", required = false, defaultValue = "") String[] carModels,
            @RequestParam(name = "carSeats", required = false, defaultValue = "0.0") double carSeats,
            @RequestParam(name = "carGear", required = false) String carGear,
            @RequestParam(name = "status") int status
    ) {
        List<String> brands = new ArrayList<String>();
        List<String> models = new ArrayList<String>();
        if(carBrands != null){
            brands = Arrays.asList(carBrands);
        }
        if(carModels != null){
            models = Arrays.asList(carModels);
        }
        return new ResponseEntity<>(carService.GetAllFirstHandCarsSearch(keyword, carPrice, carYear, carFuelType, brands, models, carSeats, carGear,status), HttpStatus.OK);
    }
    @PostMapping("/all-second-hand-car-search")
    public ResponseEntity<List<CarDetailCard>> GetSecondHandCarsSearch(
            @RequestParam(name = "searchKeyword" , required = false) String keyword,
            @RequestParam(name = "carPrice", required = false, defaultValue = "0,200000000") String[] carPrice,
            @RequestParam(name = "carYear", required = false, defaultValue = "0,3000") String[] carYear,
            @RequestParam(name = "carFuelType", required = false) String carFuelType,
            @RequestParam(name = "carBrands", required = false, defaultValue = "") String[] carBrands,
            @RequestParam(name = "carModels", required = false, defaultValue = "") String[] carModels,
            @RequestParam(name = "carSeats", required = false, defaultValue = "0.0") double carSeats,
            @RequestParam(name = "carGear", required = false) String carGear,
            @RequestParam(name = "carMileage" ,required = false, defaultValue = "0,1000000") String[] carMileage,
            @RequestParam(name = "status") int status
    ) {
        List<String> brands = new ArrayList<String>();
        List<String> models = new ArrayList<String>();
        if(carBrands != null){
            brands = Arrays.asList(carBrands);
        }
        if(carModels != null){
            models = Arrays.asList(carModels);
        }
        return new ResponseEntity<>(carService.GetAllSecondHandCarsSearch(keyword, carPrice, carYear, carFuelType, brands, models, carSeats, carGear,carMileage,status), HttpStatus.OK);
    }

    @GetMapping("/getCar")
    public ResponseEntity<CarDetailAndRec> GetCarDetail(@RequestParam("carId") int carId) {
        return carService.GetCarDetail(carId);
    }
    @GetMapping("/getCarForAdmin")
    public ResponseEntity<CarDetailForAdmin> GetCarDetailForAdmin(@RequestParam("carId") int carId) {
        return carService.GetCarDetailForAdmin(carId);
    }
    @GetMapping("/getBanedCars")
    public ResponseEntity<List<CarDetailCard>> GetMyCars() {
        return new ResponseEntity<>(carService.GetAllBanedCar(), HttpStatus.OK);
    }



        @GetMapping("myCars")
    public ResponseEntity<List<CarDetailCard>> GetMyCars(@RequestParam("username") String username) {
        return new ResponseEntity<>(carService.GetMyCars(username), HttpStatus.OK);
    }

    @GetMapping("getCarDetail")
    public ResponseEntity<CarDetailEdit> GetCarDetailForEdit(@RequestParam("carId") int carId, @RequestParam("userId") int userId) {
        return carService.GetCarDetailForEdit(carId, userId);
    }

    @GetMapping("/all-second-hand-car")
    public ResponseEntity<List<CarDetailCard>> GetSecondHandCars(@RequestParam("status") int status) {
        return new ResponseEntity<>(carService.GetAllSecondHandCars(status), HttpStatus.OK);
    }
    @DeleteMapping("/deleteCar")
    public ResponseEntity<String> DeleteCar(@RequestParam(name = "carId") int carId) {
        carService.DeleteCar(carId);
        return new ResponseEntity<>("ลบรถยนต์ออกจากระบบสำเร็จ",HttpStatus.OK);
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
            @RequestParam(name = "carImageDefect", required = false) List<MultipartFile> carImageDefect,
            @RequestParam(name = "carModel") String carModel,
            @RequestParam(name = "carPrice") double carPrice,
            @RequestParam(name = "carSeats") double carSeats,
            @RequestParam(name = "carYear") double carYear,
            @RequestParam(name = "carHeader") String carHeader,
            @RequestParam(name = "userId") int userId
    ) {
        System.out.println(carAddress);
        try {
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
                    userId,
                    carImage,
                    carImageDefect);
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ResponseEntity<>("Car Added", HttpStatus.OK);
    }

    @PutMapping("/edit-car-data")
    public ResponseEntity<String> EditCarData(@RequestParam(name = "carAddress") String carAddress,
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
                                              @RequestParam(name = "carImage", required = false) List<MultipartFile> carImage,
                                              @RequestParam(name = "carImageDefect", required = false) List<MultipartFile> carImageDefect,
                                              @RequestParam(name = "carModel") String carModel,
                                              @RequestParam(name = "carPrice") double carPrice,
                                              @RequestParam(name = "carSeats") double carSeats,
                                              @RequestParam(name = "carYear") double carYear,
                                              @RequestParam(name = "carHeader") String carHeader,
                                              @RequestParam(name = "carId") int carId,
                                              @RequestParam(name = "carImageIDDelete", required = false) int[] carImageIDDelete) {
        carService.EditCarData(carAddress, carBrand, carColor, carCondition, carDesc, carEVRange, carFuelConsumption, carFuelType, carGas, carGearType, carHorsePower
                , carMileage, carModel, carPrice, carSeats, carYear, carHeader, carImage, carImageDefect, carImageIDDelete, carId);
        if (carImage != null) {
            carImageService.AddCarImage(carImage, carId, 1);
        }
        if (carImageDefect != null) {
            carImageService.AddCarImage(carImageDefect, carId, 2);
        }
        return new ResponseEntity<>("Car Data Updated.", HttpStatus.OK);
    }
    @PatchMapping("/banCar")
    public ResponseEntity<String> BanCar(@RequestBody JustCarId carId){
        carService.BanCar(carId.getCarId());
        return new ResponseEntity<>("แบนโพสเรียบร้อย", HttpStatus.OK);
    }
    @PatchMapping("/unBanCar")
    public ResponseEntity<String> UnBanCar(@RequestBody JustCarId carId){
        carService.UnBanCar(carId.getCarId());
        return new ResponseEntity<>("ปลดแบนโพสเรียบร้อย", HttpStatus.OK);
    }
    @GetMapping("/getCarDetailTable")
    public ResponseEntity<List<CarDetailTable>> GetCarDetailTable(@RequestParam("userId") int userId){
        return new ResponseEntity<>(carService.GetCarDetailTable(userId),HttpStatus.OK);
    }
}
