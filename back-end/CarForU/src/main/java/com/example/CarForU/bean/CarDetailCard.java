package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDetailCard {
    private int carId;
    private String carHeader;
    private String carGearType;
    private double carMileage;
    private String carFuelType;
    private String carAddress;
    private double carPrice;
    private String carImage;
    private String username;

    public CarDetailCard() {
    }
}
