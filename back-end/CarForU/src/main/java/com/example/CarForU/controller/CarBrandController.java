package com.example.CarForU.controller;

import com.example.CarForU.bean.AddModelForm;
import com.example.CarForU.bean.CarBrandAndModelSearch;
import com.example.CarForU.bean.JustBrandName;
import com.example.CarForU.entity.CarBrand;
import com.example.CarForU.service.CarBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CarBrandController {
    @Autowired
    CarBrandService carBrandService;

    @GetMapping("/getAllBrand")
    public ResponseEntity<List<String>> GetAllBrand(){
        return new ResponseEntity<>(carBrandService.GetAllBrand(), HttpStatus.OK);
    }
    @GetMapping("/getAllBrandsAndModels")
    public ResponseEntity<List<CarBrandAndModelSearch>> GetAllBrandsAndModels(){
        return new ResponseEntity<>(carBrandService.GetAllBrandsAndModels(), HttpStatus.OK);
    }
    @PostMapping("/addBrand")
    public ResponseEntity<String> AddBrand(@RequestBody JustBrandName brandName){
        carBrandService.AddBrand(brandName.getBrandName());
        return new ResponseEntity<>("Brand is added", HttpStatus.OK);
    }
}
