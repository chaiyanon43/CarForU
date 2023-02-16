package com.example.CarForU.service;

import com.example.CarForU.bean.CarsAllResponse;
import com.example.CarForU.bean.CarForRec;
import com.example.CarForU.bean.EuclideanResult;
import com.example.CarForU.bean.EuclideanResultListResponse;
import com.example.CarForU.entity.Car;
import com.example.CarForU.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CarServiceImpl implements CarService{

    @Autowired
    CarRepository carRepository;
    @Override
    public EuclideanResultListResponse CarRecommendation(int carId) {
        List<Car> carAll = carRepository.findAll();
        double priceMax = carAll.stream().max(Comparator.comparing(v -> v.getCarPrice())).get().getCarPrice();
        double priceMin = carAll.stream().min(Comparator.comparing(v -> v.getCarPrice())).get().getCarPrice();
        double fuelConsMax = carAll.stream().max(Comparator.comparing(v -> v.getCarFuelConsumption())).get().getCarFuelConsumption();
        double fuelConsMin = carAll.stream().min(Comparator.comparing(v -> v.getCarFuelConsumption())).get().getCarFuelConsumption();
        double yearMax = carAll.stream().max(Comparator.comparing(v -> v.getCarYear())).get().getCarYear();
        double yearMin = carAll.stream().min(Comparator.comparing(v -> v.getCarYear())).get().getCarYear();
        double seatMax = carAll.stream().max(Comparator.comparing(v -> v.getCarSeats())).get().getCarSeats();
        double seatMin = carAll.stream().min(Comparator.comparing(v -> v.getCarSeats())).get().getCarSeats();
        double horsePowMax = carAll.stream().max(Comparator.comparing(v -> v.getCarHorsePower())).get().getCarHorsePower();
        double horsePowMin = carAll.stream().min(Comparator.comparing(v -> v.getCarHorsePower())).get().getCarHorsePower();
        double carEVRangeMax = carAll.stream().max(Comparator.comparing(v -> v.getCarEVRange())).get().getCarEVRange();
        double carEVRangeMin = carAll.stream().min(Comparator.comparing(v -> v.getCarEVRange())).get().getCarEVRange();
        List<CarForRec> normalizeCar = new ArrayList<>();
        for (int i = 0 ; i<carAll.size() ;i++) {
            CarForRec carRecTemp = new CarForRec();
            carRecTemp.setCarId(carAll.get(i).getCarId());
            carRecTemp.setCarFuelConsumption(NormalizeCalculate(fuelConsMax, fuelConsMin, carAll.get(i).getCarFuelConsumption()));
            carRecTemp.setCarYear(NormalizeCalculate(yearMax, yearMin, carAll.get(i).getCarYear()));
            carRecTemp.setCarPrice(NormalizeCalculate(priceMax, priceMin, carAll.get(i).getCarPrice()));
            carRecTemp.setCarSeats(NormalizeCalculate(seatMax, seatMin, carAll.get(i).getCarSeats()));
            carRecTemp.setCarHorsePower(NormalizeCalculate(horsePowMax, horsePowMin, carAll.get(i).getCarHorsePower()));
            carRecTemp.setCarEVRange(NormalizeCalculate(carEVRangeMax,carEVRangeMin,carAll.get(i).getCarEVRange()));
            carRecTemp.setCarFuelType(carAll.get(i).getCarFuelType());
//            carRecTemp.setCarBrand(carAll.get(i).getCarBrand());
            normalizeCar.add(carRecTemp);
        }
        return EuclideanDistance(normalizeCar,carId);
    }

    @Override
    public List<CarsAllResponse> GetAllFirstHandCars() {
        List<Car> cars = carRepository.findFirstHandCondition();
        return ConditionClassify(cars);
    }

    @Override
    public List<CarsAllResponse> GetAllSecondHandCars() {
        List<Car> cars = carRepository.findSecondHandCondition();
        return ConditionClassify(cars);
    }

    public List<CarsAllResponse> ConditionClassify(List<Car> cars){
        List<CarsAllResponse> carResult = new ArrayList<>();
        for (int i = 0; i<cars.size();i++){
            CarsAllResponse car = new CarsAllResponse();
            car.setCarId(cars.get(i).getCarId());
            car.setCarBrand(cars.get(i).getModelId().getCarBrand().getBrandName());
            car.setCarModel(cars.get(i).getModelId().getModelName());
            car.setCarGearType(cars.get(i).getCarGearType());
            car.setCarPrice(cars.get(i).getCarPrice());
            car.setCarYear(cars.get(i).getCarYear());
            car.setCarSeats(cars.get(i).getCarSeats());
            car.setCarHorsePower(cars.get(i).getCarHorsePower());
            car.setCarDesc(cars.get(i).getCarDesc());
            car.setCarAddress(cars.get(i).getCarAddress());
            car.setCarFuelConsumption(cars.get(i).getCarFuelConsumption());
            car.setCarCondition(cars.get(i).getCarCondition());
            car.setCarGas(cars.get(i).getCarGas());
            car.setCarMileage(cars.get(i).getCarMileage());
            carResult.add(car);
        }
        return carResult;
    }

    public double NormalizeCalculate(double max,double min,double current){
        DecimalFormat f = new DecimalFormat("##.00");
        double nor = Double.parseDouble(f.format((current - min)/(max-min)));
        return nor;
    }
    public EuclideanResultListResponse EuclideanDistance(List<CarForRec> norCar,int currentCarId){
        EuclideanResultListResponse euclideanResultList = new EuclideanResultListResponse();
        List<EuclideanResult> evResult = new ArrayList<>();
        List<EuclideanResult> norResult = new ArrayList<>();
        List<EuclideanResult> hybridResult = new ArrayList<>();
        CarForRec recTemp = norCar.stream().filter(car -> currentCarId == car.getCarId()).findAny().orElse(null);;
        for (int i = 0; i < norCar.size() ; i++) {
            EuclideanResult euclideanResult = new EuclideanResult();
            if(norCar.get(i).getCarId() == currentCarId){
                continue;
            }else{
                double tempEuclideanDistance = CalculateEuclideanDistance(recTemp,norCar.get(i));
                euclideanResult.setCarId(norCar.get(i).getCarId());
                euclideanResult.setEuclideanDistance(tempEuclideanDistance);
                euclideanResult.setCarFuelType(norCar.get(i).getCarFuelType());
                if(norCar.get(i).getCarFuelType().equals("EV")){
                    evResult.add(euclideanResult);
                } else if (norCar.get(i).getCarFuelType().equals("Hybrid")) {
                    hybridResult.add(euclideanResult);
                }else{
                    norResult.add(euclideanResult);
                }
            }
        }

        Object[] sortedEVEuclidean = evResult.stream().sorted((eu1,eu2) -> Double.compare(eu1.getEuclideanDistance(),eu2.getEuclideanDistance())).limit(3).toArray();
        Object[] sortedHybridEuclidean = hybridResult.stream().sorted((eu1,eu2) -> Double.compare(eu1.getEuclideanDistance(),eu2.getEuclideanDistance())).limit(3).toArray();
        Object[] sortedNormalEuclidean = norResult.stream().sorted((eu1,eu2) -> Double.compare(eu1.getEuclideanDistance(),eu2.getEuclideanDistance())).limit(3).toArray();
        euclideanResultList.setEuclideanResultEVList(sortedEVEuclidean);
        euclideanResultList.setEuclideanResultHybridList(sortedHybridEuclidean);
        euclideanResultList.setEuclideanResultNormalList(sortedNormalEuclidean);
        return euclideanResultList;
    }
    double CalculateEuclideanDistance(CarForRec recTemp,CarForRec norCar){
        double tempEuclideanDistance = (Math.pow(recTemp.getCarPrice()-norCar.getCarPrice(),2)) +
                        (Math.pow(recTemp.getCarYear()-norCar.getCarYear(),2)) +
                        (Math.pow(recTemp.getCarSeats()-norCar.getCarSeats(),2)) +
                        (Math.pow(recTemp.getCarHorsePower()-norCar.getCarHorsePower(),2));
        if(recTemp.getCarFuelType().equals("EV") && norCar.getCarFuelType().equals("EV")){
            tempEuclideanDistance = tempEuclideanDistance + Math.pow(recTemp.getCarEVRange()-norCar.getCarEVRange(),2);
        }else if(!recTemp.getCarFuelType().equals("EV") && !norCar.getCarFuelType().equals("EV")){
            tempEuclideanDistance = tempEuclideanDistance +
                    (Math.pow(recTemp.getCarFuelConsumption()-norCar.getCarFuelConsumption(),2));
        }
        tempEuclideanDistance = Math.sqrt(tempEuclideanDistance);
        return tempEuclideanDistance;
    }
}
