package com.example.CarForU.service;

import com.example.CarForU.bean.CarBrandAndModelSearch;
import com.example.CarForU.bean.ModelIdAndName;
import com.example.CarForU.entity.CarBrand;
import com.example.CarForU.entity.CarModel;
import com.example.CarForU.repository.CarBrandRepository;
import com.example.CarForU.repository.CarModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CarBrandServiceImpl implements CarBrandService{
    @Autowired
    CarBrandRepository carBrandRepository;
    @Autowired
    CarModelRepository carModelRepository;
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

    @Override
    public List<CarBrandAndModelSearch> GetAllBrandsAndModels() {
        List<CarBrand> carBrands = carBrandRepository.findAll();
        List<CarBrandAndModelSearch> carBrandAndModelSearches = new ArrayList<>();
        for (int i = 0; i < carBrands.size(); i++) {
            List<CarModel> carModels = carModelRepository.findCarModelsByBrandId(carBrands.get(i).getBrandId());
            CarBrandAndModelSearch carBMSearch = new CarBrandAndModelSearch();
            carBMSearch.setKey(carBrands.get(i).getBrandId());
            carBMSearch.setData(carBrands.get(i).getBrandName());
            carBMSearch.setLabel(carBrands.get(i).getBrandName());
            List<ModelIdAndName> modelIdAndNames = new ArrayList<>();
            for (int j = 0; j < carModels.size(); j++) {
                ModelIdAndName modelIdAndName =new ModelIdAndName();
                modelIdAndName.setKey(carBrands.get(i).getBrandId()+"-"+carModels.get(j).getModelId());
                modelIdAndName.setData(carModels.get(j).getModelName());
                modelIdAndName.setLabel(carModels.get(j).getModelName());
                modelIdAndNames.add(modelIdAndName);
            }
            carBMSearch.setChildren(modelIdAndNames);
            carBrandAndModelSearches.add(carBMSearch);
        }
        return carBrandAndModelSearches;
    }
}
