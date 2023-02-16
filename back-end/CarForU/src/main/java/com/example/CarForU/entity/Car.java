package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "CAR")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CAR_ID")
    private int carId;
    @ManyToOne
    @JoinColumn(name = "car_model_id",nullable = false)
    private CarModel modelId;
    @Column(name = "CAR_FUEL_TYPE")
    private String carFuelType;
    @Column(name = "CAR_YEAR")
    private double carYear;
    @Column(name = "CAR_MILEAGE")
    private double carMileage;
    @Column(name = "CAR_COLOR")
    private String carColor;
    @Column(name = "CAR_GAS")
    private Boolean carGas;
    @Column(name = "CAR_GEAR_TYPE")
    private String carGearType;
    @Column(name = "CAR_PRICE")
    private double carPrice;
    @Column(name = "CAR_SEATS")
    private double carSeats;
    @Column(name = "CAR_HORSE_POWER")
    private double carHorsePower;
    @Column(name = "CAR_DESC")
    private String carDesc;
    @Column(name = "CAR_ADDRESS")
    private String carAddress;
    @Column(name = "CAR_CONDITION")
    private String carCondition;
    @Column(name = "CAR_EV_RANGE")
    private double carEVRange;
    @Column(name = "CAR_FUEL_CONSUMPTION")
    private double carFuelConsumption;

    @ManyToOne
    @JoinColumn(name = "car_user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "car")
    Set<CarLikes> carLikes;

    @OneToMany(mappedBy = "car")
    Set<CarImage> carImages;

    @OneToMany(mappedBy = "car")
    Set<Notification> notifications;

    public Car() {
    }

    @Override
    public String toString() {
        return "Car{" +
                "carId=" + carId +
                ", carFuelType='" + carFuelType + '\'' +
                ", carYear=" + carYear +
                ", carMileage=" + carMileage +
                ", carColor='" + carColor + '\'' +
                ", carGas=" + carGas +
                ", carGearType='" + carGearType + '\'' +
                ", carPrice=" + carPrice +
                ", carSeats=" + carSeats +
                ", carHorsePower=" + carHorsePower +
                ", carDesc='" + carDesc + '\'' +
                ", carAddress='" + carAddress + '\'' +
                ", carCondition='" + carCondition + '\'' +
                ", carEVRange=" + carEVRange +
                ", carFuelConsumption=" + carFuelConsumption +
                '}';
    }
}
