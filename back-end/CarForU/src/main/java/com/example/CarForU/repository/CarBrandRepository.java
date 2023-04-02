package com.example.CarForU.repository;

import com.example.CarForU.entity.CarBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarBrandRepository extends JpaRepository<CarBrand, Integer> {
    @Query("SELECT b FROM CarBrand b order by b.brandName")
    CarBrand[] findAllBrand();
    @Query("SELECT b FROM CarBrand b WHERE b.brandName = :brandName")
    CarBrand findCarBrandByBrandName(@Param("brandName") String brandName);
    @Query("SELECT b FROM CarBrand b WHERE b.brandName = :brandName")
    CarBrand findCarBrandIdByBrandName(@Param("brandName") String brandName);
}
