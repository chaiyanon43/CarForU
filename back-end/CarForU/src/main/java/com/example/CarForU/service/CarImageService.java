package com.example.CarForU.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarImageService {
    List<String> GetCarImage(int carId);
    String AddCarImage(MultipartFile[] multipartFiles,int carId);
}
