package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class CarLikesKey implements Serializable {
    @Column(name = "USER_ID")
    int userId;
    @Column(name = "CAR_ID")
    int carId;

    public CarLikesKey() {
    }
}
