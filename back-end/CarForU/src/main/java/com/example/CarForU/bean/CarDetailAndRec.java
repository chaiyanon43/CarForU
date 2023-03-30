package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDetailAndRec {
    private UserDetailResponse user;
    private CarsAllResponse car;
    private RecResponseList recList;

    public CarDetailAndRec() {
    }
}
