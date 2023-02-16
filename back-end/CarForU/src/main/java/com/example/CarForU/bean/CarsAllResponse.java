package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

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
    private boolean carGas;
    private double carMileage;
    private String carCondition;

    public CarsAllResponse() {
    }
}
