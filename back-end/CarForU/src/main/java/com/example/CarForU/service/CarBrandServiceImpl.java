package com.example.CarForU.service;

import com.example.CarForU.entity.CarBrand;
import com.example.CarForU.repository.CarBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CarBrandServiceImpl implements CarBrandService{
    @Autowired
    CarBrandRepository carBrandRepository;
    @Override
    public List<String> GetAllBrand() {
        List<String> carBrands = new ArrayList<String>();
        carBrandRepository.findAll().forEach(carBrand -> carBrands.add(carBrand.getBrandName()));
        return carBrands;
    }

    @Override
    public CarBrand GetCarBrand(String brandName) {
        return null;
    }
}
