package com.example.CarForU.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "CAR_MODEL")
@Setter
@Getter
public class CarModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MODEL_ID")
    private int modelId;
    @Column(name = "MODEL_NAME")
    private String modelName;
    @OneToMany(mappedBy = "modelId")
    Set<Car> car;
    @ManyToOne
    @JoinColumn(name = "BRAND_ID",nullable = false)
    private CarBrand carBrand;

    public CarModel() {
    }
}
