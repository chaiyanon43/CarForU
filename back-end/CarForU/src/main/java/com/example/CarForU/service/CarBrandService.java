package com.example.CarForU.service;

import com.example.CarForU.bean.CarBrandAndModelSearch;
import com.example.CarForU.entity.CarBrand;

import java.util.List;

public interface CarBrandService {
    List<String> GetAllBrand();
    CarBrand GetCarBrand(String brandName);
    void AddBrand(String brandName);
    List<CarBrandAndModelSearch> GetAllBrandsAndModels();
}
