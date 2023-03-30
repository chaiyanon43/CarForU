package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CarDetailEdit {
    private int userId;
    private int carId;
    private String carBrand;
    private String carModel;
    private String carGearType;
    private double carPrice;
    private double carYear;
    private double carSeats;
    private double carHorsePower;
    private String carDesc;
    private String carAddress;
    private double carFuelConsumption;
    private String carFuelType;
    private String carColor;
    private boolean carGas;
    private double carMileage;
    private String carCondition;
    private double carEVRange;
    private String carHeader;
    private List<ImageDetail> carImages;
    private List<ImageDetail> carImagesDefect;
}
