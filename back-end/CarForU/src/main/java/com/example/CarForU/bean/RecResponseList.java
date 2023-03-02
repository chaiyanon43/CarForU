package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecResponseList {
    private List<RecResponse> normalCar;
    private List<RecResponse> hybridCar;
    private List<RecResponse> EVCar;

    public RecResponseList() {
    }
}
