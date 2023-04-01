package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDetailTable {
    private int carId;
    private String carCondition;
    private String carBrand;
    private String carModel;
    private int carStatus;

    public CarDetailTable() {
    }
}
