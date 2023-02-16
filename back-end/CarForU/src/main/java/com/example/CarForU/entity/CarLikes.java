package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CarLikes {
    @EmbeddedId
    CarLikesKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "USER_ID")
    User user;

    @ManyToOne
    @MapsId("carId")
    @JoinColumn(name = "CAR_ID")
    Car car;

    public CarLikes() {
    }
}
