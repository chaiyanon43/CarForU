package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "CAR_BRAND")
@Getter
@Setter
public class CarBrand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BRAND_ID")
    private int brandId;
    @Column(name = "BRAND_NAME",unique = true)
    private String brandName;
    @OneToMany(mappedBy = "carBrand")
    Set<CarModel> carModels;

    public CarBrand() {
    }
}
