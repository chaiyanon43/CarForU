package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "CAR_IMAGE")
@Getter
@Setter
public class CarImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CAR_IMAGE_ID")
    private int carImageId;
    @Lob
    @Column(name = "CAR_IMAGE_IMG",columnDefinition = "MEDIUMBLOB")
    private String carImage;
    @ManyToOne
    @JoinColumn(name = "CAR_ID",nullable = false)
    private Car car;

    public CarImage() {
    }
}
