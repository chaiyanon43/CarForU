package com.example.CarForU.service;

import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarImage;
import com.example.CarForU.repository.CarImageRepository;
import com.example.CarForU.repository.CarRepository;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
@Service
public class CarImageServiceImpl implements CarImageService{
    @Override
    public List<String> GetCarImage(int carId) {
        return null;
    }
    @Autowired
    CarRepository carRepository;
    @Autowired
    CarImageRepository carImageRepository;
    @Override
    public String AddCarImage(List<MultipartFile> multipartFiles,int carId,int status) {
        Car car = carRepository.findById(carId);
        for (int i = 0; i< multipartFiles.size() ; i++){
            CarImage carImage = new CarImage();
            String fileName = StringUtils.cleanPath(multipartFiles.get(i).getOriginalFilename());
            if(fileName.contains("..")){
                System.out.println("not a valid file");
            }
            try{
                carImage.setCarImage(Base64.getEncoder().encodeToString(multipartFiles.get(i).getBytes()));
            }catch (IOException e){
                e.printStackTrace();
            }
            carImage.setCar(car);
            carImage.setCarImageStatus(status);
            carImageRepository.save(carImage);
        }
        return "Success";
    }
}
