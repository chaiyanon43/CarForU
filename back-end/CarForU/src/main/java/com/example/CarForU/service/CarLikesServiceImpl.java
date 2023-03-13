package com.example.CarForU.service;

import com.example.CarForU.bean.CarDetailCard;
import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.entity.*;
import com.example.CarForU.repository.CarImageRepository;
import com.example.CarForU.repository.CarLikesRepository;
import com.example.CarForU.repository.CarRepository;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarLikesServiceImpl implements CarLikesService{

    @Autowired
    CarRepository carRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CarLikesRepository carLikesRepository;
    @Autowired
    CarImageRepository carImageRepository;
    @Override
    public void AddCarLikes(String username, int carId) {
        User user = userRepository.findUserByUsernameForProfile(username);
        Car car = carRepository.findById(carId);
        CarLikes carLikes = new CarLikes();
        CarLikesKey carLikesKey = new CarLikesKey();
        carLikesKey.setCarId(car.getCarId());
        carLikesKey.setUserId(user.getUserId());
        carLikes.setId(carLikesKey);
        carLikes.setCar(car);
        carLikes.setUser(user);
        carLikesRepository.save(carLikes);
    }

    @Override
    public void UnLikeCar(String username, int carId) {
        User user = userRepository.findUserByUsernameForProfile(username);
        Car car = carRepository.findById(carId);
        CarLikesKey carLikesKey = new CarLikesKey();
        carLikesKey.setCarId(car.getCarId());
        carLikesKey.setUserId(user.getUserId());
        carLikesRepository.deleteCarLikesByCarAndUser(car,user);
    }

    @Override
    public List<CarDetailCard> GetFavoriteCars(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        List<CarLikes> carLikes = carLikesRepository.findCarLikesByUser(user);
        List<CarDetailCard> carDetailCards = new ArrayList<>();
        for (int i = 0; i < carLikes.size(); i++) {
            CarDetailCard carDetailCard = new CarDetailCard();
            carDetailCard.setCarId(carLikes.get(i).getCar().getCarId());
            carDetailCard.setCarHeader(carLikes.get(i).getCar().getCarHeader());
            carDetailCard.setCarGearType(carLikes.get(i).getCar().getCarGearType());
            carDetailCard.setCarMileage(carLikes.get(i).getCar().getCarMileage());
            carDetailCard.setCarFuelType(carLikes.get(i).getCar().getCarFuelType());
            carDetailCard.setCarAddress(carLikes.get(i).getCar().getCarAddress());
            carDetailCard.setCarPrice(carLikes.get(i).getCar().getCarPrice());
            List<CarImage> carImages = carImageRepository.findCarImageByCarId(carLikes.get(i).getCar().getCarId());
            carDetailCard.setCarImage(carImages.get(0).getCarImage());
            carDetailCards.add(carDetailCard);
        }
        return carDetailCards;
    }

    @Override
    public List<Integer> GetFavoriteCarId(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        List<Integer> carLikesId = carLikesRepository.findCarLikesIdByUser(user);
        return carLikesId;
    }
}
