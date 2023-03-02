package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;

@Getter
@Setter
public class RecResponse {
    private int carId;
    @Lob
    private String carImage;
    private String carHeader;
    private double carPrice;

    public RecResponse() {
    }
}
