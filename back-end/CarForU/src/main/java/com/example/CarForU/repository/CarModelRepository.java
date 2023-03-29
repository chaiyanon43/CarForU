package com.example.CarForU.repository;

import com.example.CarForU.entity.CarBrand;
import com.example.CarForU.entity.CarModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel,Integer> {
    @Query(
            value = "SELECT * FROM car_model m WHERE m.brand_id =:brandId",
            nativeQuery = true)
    List<CarModel> findCarModelByBrand(@Param("brandId") int brandId);

    @Query(
            value = "SELECT * FROM car_model m WHERE m.model_name =:modelName",
            nativeQuery = true)
    CarModel findCarModelByModelName(@Param("modelName") String modelName);

    @Query("SELECT m FROM CarModel m WHERE m.carBrand.brandId =:brandId")
    List<CarModel> findCarModelsByBrandId(@Param("brandId") int brandId);
}


