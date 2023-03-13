package com.example.CarForU.service;

import com.example.CarForU.bean.CarDetailCard;
import com.example.CarForU.bean.CarsAllResponse;

import java.util.List;

public interface CarLikesService {
    void AddCarLikes(String username,int carId);
    void UnLikeCar(String username ,int carId);
    List<CarDetailCard> GetFavoriteCars(String username);
    List<Integer> GetFavoriteCarId(String username);
}
