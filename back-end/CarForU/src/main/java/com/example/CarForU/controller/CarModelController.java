package com.example.CarForU.controller;

import com.example.CarForU.bean.AddModelForm;
import com.example.CarForU.service.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CarModelController {
    @Autowired
    CarModelService carModelService;
    @PostMapping("/add-model")
    public ResponseEntity<String> AddModel(@RequestBody AddModelForm addModelForm){
        carModelService.AddModel(addModelForm.getBrandName(), addModelForm.getModelName());
        return new ResponseEntity<>("Model is added", HttpStatus.OK);
    }
    @GetMapping("/get-model")
    public ResponseEntity<List<String>> GetModelByBrandName(@RequestParam("brandName") String brandName){
        return new ResponseEntity<>(carModelService.GetModelByBrandName(brandName),HttpStatus.OK);
    }
}
