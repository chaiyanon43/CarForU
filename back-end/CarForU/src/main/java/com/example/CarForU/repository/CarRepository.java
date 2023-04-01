package com.example.CarForU.repository;

import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarModel;
import com.example.CarForU.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car,Integer> {
    @Query("SELECT c FROM Car c WHERE c.carCondition ='มือหนึ่ง'and c.carStatus=1 and c.user.status=1 order by c.carId DESC ")
    List<Car> findFirstHandCondition();
    @Query("SELECT c FROM Car c WHERE c.carCondition ='มือสอง' and c.carStatus=1 and c.user.status=1 order by c.carId DESC")
    List<Car> findSecondHandCondition();
    @Query("SELECT c FROM Car c WHERE c.carStatus=2 order by c.carId DESC")
    List<Car> findBanedCar();

    @Query("SELECT c FROM Car c WHERE c.carId = :carId")
    Car findById(@Param("carId") int carId);
    @Query("SELECT c FROM Car c WHERE c.carId = :carId and c.carStatus=1")
    Car findByIdHaveStatus(@Param("carId") int carId);
    @Query("SELECT c FROM Car c WHERE c.carId = :carId")
    Car findByIdHaveStatusTwo(@Param("carId") int carId);

    @Query("SELECT c FROM Car c WHERE c.carId = :carId and c.user.userId =:userId")
    Car findByIdAndUserid(@Param("carId") int carId,@Param("userId") int userId);
    @Query("SELECT c FROM Car c where c.carId = :carId")
    Car findRecCarById(@Param("carId")int carId);
    @Query("SELECT c FROM Car c WHERE c.user = :user and c.carStatus =1")
    List<Car>  findCarByUser(@Param("user") User user);
    @Modifying
    @Transactional
    @Query("DELETE from Car c where c.carId =:carId")
    void deleteCarByCarId(@Param("carId") int carId);
    @Query("SELECT c FROM Car c WHERE (c.carHeader LIKE CONCAT('%', :keyword,'%') " +
            "OR c.modelId.carBrand.brandName LIKE CONCAT('%', :keyword,'%')  " +
            "OR c.modelId.modelName LIKE CONCAT('%', :keyword,'%')  " +
            "OR c.carDesc LIKE CONCAT('%', :keyword,'%')) and (c.modelId.carBrand.brandName IN :carBrands or " +
            "c.modelId.modelName IN :carModels) and (c.carPrice between :priceMin and :priceMax) and (c.carYear between :yearMin and  :yearMax) " +
            "and c.carSeats in :carSeats and c.carGearType LIKE CONCAT('%', :gear,'%') and c.carFuelType LIKE CONCAT('%', :fuelType,'%') and  c.carCondition='มือหนึ่ง' and c.carStatus=1 and c.user.status=1 " +
            "ORDER BY c.carId DESC "
            )
    List<Car> searchCar(@Param("keyword") String keyword,@Param("carBrands") List<String> carBrands,@Param("carModels") List<String> carModels
            ,@Param("priceMin") double priceMin,@Param("priceMax") double priceMax,@Param("yearMin") double yearMin
            ,@Param("yearMax") double yearMax,List<Double> carSeats,@Param("gear") String gear,@Param("fuelType") String fuelType);
    @Query("SELECT c FROM Car c WHERE (c.carHeader LIKE CONCAT('%', :keyword,'%') " +
            "OR c.modelId.carBrand.brandName LIKE CONCAT('%', :keyword,'%')  " +
            "OR c.modelId.modelName LIKE CONCAT('%', :keyword,'%')  " +
            "OR c.carDesc LIKE CONCAT('%', :keyword,'%')) and (c.modelId.carBrand.brandName IN :carBrands or " +
            "c.modelId.modelName IN :carModels) and (c.carPrice between :priceMin and :priceMax) and (c.carYear between :yearMin and  :yearMax) and " +
            "(c.carMileage <:carMileage)" +
            "and c.carSeats in :carSeats and c.carGearType LIKE CONCAT('%', :gear,'%') and c.carFuelType LIKE CONCAT('%', :fuelType,'%') and  c.carCondition='มือสอง' and c.carStatus=1 and c.user.status=1 " +
            "ORDER BY c.carId DESC "
    )
    List<Car> searchSecondCar(@Param("keyword") String keyword,@Param("carBrands") List<String> carBrands,@Param("carModels") List<String> carModels
            ,@Param("priceMin") double priceMin,@Param("priceMax") double priceMax,@Param("yearMin") double yearMin
            ,@Param("yearMax") double yearMax,List<Double> carSeats,@Param("gear") String gear,@Param("fuelType") String fuelType
            ,@Param("carMileage") double carMileage);
    @Modifying
    @Transactional
    @Query("UPDATE Car c set c.carAddress =:carAddress, c.carColor =:carColor " +
            ",c.carCondition =:carCondition,c.carDesc =:carDesc,c.carEVRange =:carEVRange," +
            "c.carFuelConsumption =:carFuelConsumption,c.carFuelType =:carFuelType," +
            "c.carGas =:carGas,c.carGearType =:carGearType,c.carHorsePower =:carHorsePower," +
            "c.carMileage =:carMileage,c.carPrice =:carPrice,c.carSeats =:carSeats,c.carYear=:carYear," +
            "c.modelId=:carModel,c.carHeader=:carHeader where c.carId =:carId")
    void UpdateCarDetail(@Param("carAddress") String carAddress,
                         @Param("carColor") String carColor,
                         @Param("carCondition") String carCondition,
                         @Param("carDesc") String carDesc,
                         @Param("carEVRange") double carEVRange,
                         @Param("carFuelConsumption") double carFuelConsumption,
                         @Param("carFuelType") String carFuelType,
                         @Param("carGas") Boolean carGas,
                         @Param("carGearType") String carGearType,
                         @Param("carHorsePower") double carHorsePower,
                         @Param("carMileage") double carMileage,
                         @Param("carPrice") double carPrice,
                         @Param("carSeats") double carSeats,
                         @Param("carYear") double carYear,
                         @Param("carModel") CarModel modelId,
                         @Param("carHeader") String carHeader,
                         @Param("carId") int carId
                         );
    @Modifying
    @Transactional
    @Query("UPDATE Car c set c.carStatus=2 where c.carId =:carId")
    void banCarById(@Param("carId") int carId);
    @Modifying
    @Transactional
    @Query("UPDATE Car c set c.carStatus=1 where c.carId =:carId")
    void unBanCarById(@Param("carId") int carId);
    @Query("SELECT c from Car c where c.user.userId =:userId")
    List<Car> findCarForAdminByUserId(@Param("userId") int userId);

}
