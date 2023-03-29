package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CarBrandAndModelSearch {
    private int key;
    private String data; //brandName
    private String label; //brandName
    private List<ModelIdAndName> children;

    public CarBrandAndModelSearch() {
    }
}
