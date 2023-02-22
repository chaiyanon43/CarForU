package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AddCarRequest {
    private String carBrand;
    private String carModel;
    private String carAddress;
    private String carColor;
    private String carDesc;
    private String carFuelType;
    private String carGearType;
    private String carHeader;
    private double carEVRange;
    private double carFuelConsumption;
    private double carHorsePower;
    private double carMileage;
    private double carPrice;
    private double carYear;
    private MultipartFile[] carImage;
    private MultipartFile[] carImageDefect;

}
