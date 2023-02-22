package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Lob;

@Getter
@Setter
public class CarImageResponse {
    @Lob
    private String carImage;

    @Override
    public String toString() {
        return carImage;
    }

    public CarImageResponse() {
    }
}
