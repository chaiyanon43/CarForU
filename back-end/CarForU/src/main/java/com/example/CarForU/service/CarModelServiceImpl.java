package com.example.CarForU.service;

import com.example.CarForU.entity.CarBrand;
import com.example.CarForU.entity.CarModel;
import com.example.CarForU.repository.CarBrandRepository;
import com.example.CarForU.repository.CarModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarModelServiceImpl implements CarModelService{
    @Autowired
    CarModelRepository carModelRepository;
    @Autowired
    CarBrandRepository carBrandRepository;
    @Override
    public void AddModel(String brandName, String modelName) {
        CarBrand carBrand = carBrandRepository.findCarBrandByBrandName(brandName);
        CarModel carModel = new CarModel();
        carModel.setModelName(modelName);
        carModel.setCarBrand(carBrand);
        carModelRepository.save(carModel);
    }

    @Override
    public List<String> GetModelByBrandName(String brandName) {
        List<String> models = new ArrayList<String>();
        CarBrand carBrand = carBrandRepository.findCarBrandByBrandName(brandName);
        carModelRepository.findCarModelByBrand(carBrand.getBrandId()).forEach(e -> models.add(e.getModelName()));
        return models;
    }

}
