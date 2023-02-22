package com.example.CarForU.bean;

import com.example.CarForU.entity.CarImage;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CarsAllResponse {
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
    private boolean carGas;
    private double carMileage;
    private String carCondition;
    private List<CarImageResponse> carImage;

    public CarsAllResponse() {
    }
}
