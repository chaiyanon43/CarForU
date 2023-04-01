package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDetailForAdmin {
    private UserDetailResponse user;
    private CarsAllResponse car;

    public CarDetailForAdmin() {
    }
}
