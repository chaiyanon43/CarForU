package com.example.CarForU.service;

import com.example.CarForU.bean.*;
import com.example.CarForU.entity.Car;
import com.example.CarForU.entity.CarImage;
import com.example.CarForU.entity.CarModel;
import com.example.CarForU.entity.User;
import com.example.CarForU.repository.CarImageRepository;
import com.example.CarForU.repository.CarModelRepository;
import com.example.CarForU.repository.CarRepository;
import com.example.CarForU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class CarServiceImpl implements CarService{

    @Autowired
    CarRepository carRepository;
    @Autowired
    CarImageRepository carImageRepository;
    @Autowired
    CarModelRepository carModelRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CarImageService carImageService;
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
    public CarDetailAndRec GetCarDetail(int carId) {
        CarsAllResponse carRes = new CarsAllResponse();
        Car car = carRepository.findById(carId);
        carRes.setCarBrand(car.getModelId().getCarBrand().getBrandName());
        carRes.setCarModel(car.getModelId().getModelName());
        carRes.setCarId(car.getCarId());
        carRes.setCarCondition(car.getCarCondition());
        carRes.setCarAddress(car.getCarAddress());
        carRes.setCarDesc(car.getCarDesc());
        carRes.setCarPrice(car.getCarPrice());
        carRes.setCarGas(car.getCarGas());
        carRes.setCarYear(car.getCarYear());
        carRes.setCarSeats(car.getCarSeats());
        carRes.setCarFuelType(car.getCarFuelType());
        carRes.setCarFuelConsumption(car.getCarFuelConsumption());
        carRes.setCarMileage(car.getCarMileage());
        carRes.setCarGearType(car.getCarGearType());
        carRes.setCarHorsePower(car.getCarHorsePower());
        List<CarImageResponse> images = new ArrayList<CarImageResponse>();
        carImageRepository.findCarImageByCarId(carId).forEach(img -> {
                    CarImageResponse image = new CarImageResponse();
                    image.setCarImage(img.getCarImage());
                    images.add(image);
                }
        );
        carRes.setCarHeader(car.getCarHeader());
        carRes.setCarImage(images);
        EuclideanResultListResponse EuclideanData = CarRecommendation(carId);
        RecResponseList recResponseList = new RecResponseList();
        List<EuclideanResult> evResult = new ArrayList<>();
        List<RecResponse> carEVList = new ArrayList<>();
        List<RecResponse> carHBList = new ArrayList<>();
        List<RecResponse> carNMList = new ArrayList<>();
        for (int i = 0; i < EuclideanData.getEuclideanResultEVList().length; i++) {
            EuclideanResult euclideanEVResult = (EuclideanResult) EuclideanData.getEuclideanResultEVList()[i];
            Car carEV = carRepository.findRecCarById(euclideanEVResult.getCarId());
            RecResponse recResponseEV = new RecResponse();
            recResponseEV.setCarId(carEV.getCarId());
            recResponseEV.setCarHeader(carEV.getCarHeader());
            recResponseEV.setCarPrice(carEV.getCarPrice());
            recResponseEV.setCarImage(carImageRepository.findCarImageByCarId(carEV.getCarId()).get(0).getCarImage());
            carEVList.add(recResponseEV);
        }
        recResponseList.setEVCar(carEVList);
        for (int i = 0; i < EuclideanData.getEuclideanResultHybridList().length; i++) {
            EuclideanResult euclideanHBResult = (EuclideanResult) EuclideanData.getEuclideanResultHybridList()[i];
            Car carHB = carRepository.findRecCarById(euclideanHBResult.getCarId());
            RecResponse recResponseHB = new RecResponse();
            recResponseHB.setCarId(carHB.getCarId());
            recResponseHB.setCarHeader(carHB.getCarHeader());
            recResponseHB.setCarPrice(carHB.getCarPrice());
            recResponseHB.setCarImage(carImageRepository.findCarImageByCarId(carHB.getCarId()).get(0).getCarImage());
            carHBList.add(recResponseHB);
        }
        recResponseList.setHybridCar(carHBList);
        for (int i = 0; i < EuclideanData.getEuclideanResultNormalList().length; i++) {
            EuclideanResult euclideanNMResult = (EuclideanResult) EuclideanData.getEuclideanResultNormalList()[i];
            Car carNM = carRepository.findRecCarById(euclideanNMResult.getCarId());
            RecResponse recResponseNM = new RecResponse();
            recResponseNM.setCarId(carNM.getCarId());
            recResponseNM.setCarHeader(carNM.getCarHeader());
            recResponseNM.setCarPrice(carNM.getCarPrice());
            recResponseNM.setCarImage(carImageRepository.findCarImageByCarId(carNM.getCarId()).get(0).getCarImage());
            carNMList.add(recResponseNM);
        }
        recResponseList.setNormalCar(carNMList);
        CarDetailAndRec carDetailAndRec = new CarDetailAndRec();
        carDetailAndRec.setCar(carRes);
        carDetailAndRec.setRecList(recResponseList);
        return carDetailAndRec;
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
    @Override
    public void AddCar(String carAddress, String carBrandName, String carColor, String carCondition, String carDesc, double carEVRange, double carFuelConsumption, String carFuelType, Boolean carGas, String carGearType, double carHorsePower, double carMileage, String carModelName, double carPrice, double carSeats, double carYear,String carHeader,int carId,List<MultipartFile> carImage,List<MultipartFile> carImageDefect) {
        System.out.println(carBrandName);
        Car addCar = new Car();
        CarModel carModel = carModelRepository.findCarModelByModelName(carModelName);
        User user = userRepository.findUserById(1);
        addCar.setCarAddress(carAddress);
        addCar.setCarColor(carColor);
        addCar.setCarCondition(carCondition);
        addCar.setCarDesc(carDesc);
        addCar.setCarEVRange(carEVRange);
        addCar.setCarFuelConsumption(carFuelConsumption);
        addCar.setCarFuelType(carFuelType);
        addCar.setCarGas(carGas);
        addCar.setCarGearType(carGearType);
        addCar.setCarHorsePower(carHorsePower);
        addCar.setCarMileage(carMileage);
        addCar.setCarPrice(carPrice);
        addCar.setCarSeats(carSeats);
        addCar.setCarYear(carYear);
        addCar.setModelId(carModel);
        addCar.setUser(user);
        addCar.setCarHeader(carHeader);
        Car carAdded = carRepository.save(addCar);
        carImageService.AddCarImage(carImage,carAdded.getCarId(),1);
        if(carImageDefect != null){
            carImageService.AddCarImage(carImageDefect,carAdded.getCarId(),2);
        }
    }

    public List<CarsAllResponse> ConditionClassify(List<Car> cars){
        List<CarsAllResponse> carResult = new ArrayList<>();
        for (int i = 0; i<cars.size();i++){
            CarsAllResponse car = new CarsAllResponse();
            List<CarImageResponse> images = new ArrayList<CarImageResponse>();
            carImageRepository.findCarImageByCarId(cars.get(i).getCarId()).forEach(img -> {
                CarImageResponse image = new CarImageResponse();
                image.setCarImage(img.getCarImage());
                images.add(image);
                    }
            );
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
            car.setCarFuelType(cars.get(i).getCarFuelType());
            car.setCarHeader(cars.get(i).getCarHeader());
            car.setCarImage(images);
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
                } else if (norCar.get(i).getCarFuelType().equals("ไฮบริด")) {
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
