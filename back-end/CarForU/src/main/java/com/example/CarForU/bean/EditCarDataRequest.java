package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
@Getter
@Setter
public class EditCarDataRequest {
    private int carId;
    private String carAddress;
    private String carBrand;
    private String carColor;
    private String carCondition;
    private String carDesc;
    private double carEVRange;
    private double carFuelConsumption;
    private String carFuelType;
    private Boolean carGas;
    private String carGearType;
    private double carHorsePower;
    private double carMileage;
    private String carModel;
    private double carPrice;
    private double carSeats;
    private double carYear;
    private String carHeader;
    private MultipartFile[] carImage;
    private MultipartFile[] carImageDefect;
    private double[] carImageIDDelete;

    public EditCarDataRequest() {
    }

    @Override
    public String toString() {
        return "EditCarDataRequest{" +
                "carAddress='" + carAddress + '\'' +
                ", carBrand='" + carBrand + '\'' +
                ", carColor='" + carColor + '\'' +
                ", carCondition='" + carCondition + '\'' +
                ", carDesc='" + carDesc + '\'' +
                ", carEVRange=" + carEVRange +
                ", carFuelConsumption=" + carFuelConsumption +
                ", carFuelType='" + carFuelType + '\'' +
                ", carGas=" + carGas +
                ", carGearType='" + carGearType + '\'' +
                ", carHorsePower=" + carHorsePower +
                ", carMileage=" + carMileage +
                ", carModel='" + carModel + '\'' +
                ", carPrice=" + carPrice +
                ", carSeats=" + carSeats +
                ", carYear=" + carYear +
                ", carHeader='" + carHeader + '\'' +
                ", carImage=" + carImage +
                ", carImageDefect=" + carImageDefect +
                ", carImageIdDelete=" + Arrays.toString(carImageIDDelete) +
                '}';
    }
}
