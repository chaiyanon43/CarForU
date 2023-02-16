package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

import java.math.BigInteger;

@Getter
@Setter
public class CarForRec {
    private int carId;
    private double carFuelConsumption;
    private double carYear;
    private double carPrice;
    private double carSeats;
    private double carHorsePower;
    private String carFuelType;
    private String carBrand;
    private double carEVRange;

    public CarForRec() {
    }

    @Override
    public String toString() {
        return "CarForRec{" +
                "carId=" + carId +
                ", carFuelConsumption=" + carFuelConsumption +
                ", carYear=" + carYear +
                ", carPrice=" + carPrice +
                ", carSeats=" + carSeats +
                ", carHorsePower=" + carHorsePower +
                ", carBrand='" + carBrand + '\'' +
                '}';
    }
}
