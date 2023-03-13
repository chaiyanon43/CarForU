package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarLikesRequest {
    private String username;
    private int carId;

    public CarLikesRequest() {
    }
}
