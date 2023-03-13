package com.example.CarForU.controller;

import com.example.CarForU.bean.CarDetailCard;
import com.example.CarForU.bean.CarLikesRequest;
import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.EuclideanResultListResponse;
import com.example.CarForU.service.CarLikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CarLikesController {
    @Autowired
    CarLikesService carLikesService;
    @PostMapping("likeCar")
    public ResponseEntity<String> AddLikeCar(@RequestBody CarLikesRequest carReq){
        carLikesService.AddCarLikes(carReq.getUsername(),carReq.getCarId());
        return new ResponseEntity<String>("Car Add to Favorite", HttpStatus.OK);
    }
    @DeleteMapping("unlikeCar")
    public ResponseEntity<String> UnlikeCar(@RequestBody CarLikesRequest carReq) {
        carLikesService.UnLikeCar(carReq.getUsername(),carReq.getCarId());
        return new ResponseEntity<String>("Deleted Car From Favorite list", HttpStatus.OK);
    }
    @GetMapping("getFavCar")
    public ResponseEntity<List<CarDetailCard>> GetFavoriteCars(@RequestParam("username") String username){
        return new ResponseEntity<List<CarDetailCard>>(carLikesService.GetFavoriteCars(username), HttpStatus.OK);
    }
    @GetMapping("getFavCarId")
    public ResponseEntity<List<Integer>> GetFavCarId(@RequestParam("username") String username){
        return new ResponseEntity<>(carLikesService.GetFavoriteCarId(username), HttpStatus.OK);
    }
}
