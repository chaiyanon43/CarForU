package com.example.CarForU.repository;

import com.example.CarForU.entity.CarBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface CarBrandRepository extends JpaRepository<CarBrand, Integer> {
    @Query("SELECT b FROM CarBrand b")
    CarBrand[] findAllBrand();
    @Query("SELECT b FROM CarBrand b WHERE b.brandName = :brandName")
    CarBrand findCarBrandByBrandName(@Param("brandName") String brandName);
}
