package com.example.CarForU.service;

import java.util.List;

public interface CarModelService {
    void AddModel(String brandName,String modelName);
    List<String> GetModelByBrandName(String brandName);
}
