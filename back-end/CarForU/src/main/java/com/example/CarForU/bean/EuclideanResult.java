package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EuclideanResult {
    private int carId;
    private double euclideanDistance;
    private String carFuelType;

    public EuclideanResult() {
    }
}
