package com.example.CarForU.service;

import com.example.CarForU.bean.*;
import com.example.CarForU.entity.*;
import com.example.CarForU.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    CarBrandRepository carBrandRepository;
    @Override
    public EuclideanResultListResponse CarRecommendation(int carId,String condition) {
        List<Car> carAll = new ArrayList<>();
        if(condition.equals("มือหนึ่ง")){
            carAll = carRepository.findFirstHandCondition();
        }else{
            carAll = carRepository.findSecondHandCondition();
        }
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
            normalizeCar.add(carRecTemp);
        }
        return EuclideanDistance(normalizeCar,carId);
    }

    @Override
    public CarDetailAndRec GetCarDetail(int carId) {
        CarsAllResponse carRes = new CarsAllResponse();
        Car car = carRepository.findById(carId);
        User user = car.getUser();
        UserDetailResponse userDetailResponse = new UserDetailResponse();
        userDetailResponse.setUserId(user.getUserId());
        userDetailResponse.setName(user.getName());
        userDetailResponse.setPhoneNumber(user.getPhoneNumber());
        userDetailResponse.setAddress(user.getAddress());
        userDetailResponse.setImage(user.getImage());
        carRes.setUserId(car.getUser().getUserId());
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
        carRes.setCarColor(car.getCarColor());
        carRes.setCarEVRange(car.getCarEVRange());
        List<CarImageResponse> imagesOne = new ArrayList<CarImageResponse>();
        carImageRepository.findCarImageByCarIdWhereStatusOne(carId).forEach(img -> {
                    CarImageResponse image = new CarImageResponse();
                    image.setCarImage(img.getCarImage());
            imagesOne.add(image);
                }
        );
        List<CarImageResponse> imagesTwo = new ArrayList<CarImageResponse>();
        carImageRepository.findCarImageByCarIdWhereStatusTwo(carId).forEach(img -> {
                    CarImageResponse image = new CarImageResponse();
                    image.setCarImage(img.getCarImage());
                    imagesTwo.add(image);
                }
        );
        carRes.setCarHeader(car.getCarHeader());
        carRes.setCarImage(imagesOne);
        carRes.setCarImageDefect(imagesTwo);
        EuclideanResultListResponse EuclideanData = CarRecommendation(carId,car.getCarCondition());
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
        carDetailAndRec.setUser(userDetailResponse);
        return carDetailAndRec;
    }

    @Override
    public List<CarDetailCard> GetAllFirstHandCars() {
        List<Car> cars = carRepository.findFirstHandCondition();
        return ConditionClassify(cars);
    }

    @Override
    public List<CarDetailCard> GetAllFirstHandCarsSearch(String keyword,
                                                   String[] carPrice,
                                                   String[] carYear,
                                                   String carFuelType,
                                                   List<String> carBrands,
                                                   List<String> carModels,
                                                   double carSeats,
                                                   String carGear) {

        if(carBrands.size() == 0 && carModels.size() == 0){
            carBrands = new ArrayList<>();
            List<CarBrand> carBrand = carBrandRepository.findAll();
            for (int i = 0; i < carBrand.size(); i++) {
                carBrands.add(carBrand.get(i).getBrandName());
            }
            carModels = new ArrayList<>();
            List<CarModel> carModel = carModelRepository.findAll();
            for (int i = 0; i < carModel.size(); i++) {
                carModels.add(carModel.get(i).getModelName());
            }
        }
        double priceMin = Double.parseDouble(carPrice[0]);
        double priceMax = Double.parseDouble(carPrice[1]);
        double yearMin = Double.parseDouble(carYear[0]);
        double yearMax = Double.parseDouble(carYear[1]);
        List<Double> seats = new ArrayList<>();
        if(carSeats == 0){
            seats.add(2.0);
            seats.add(4.0);
            seats.add(5.0);
            seats.add(7.0);
        }else{
            seats.add(carSeats);
        }
        List<Car> cars = carRepository.searchCar(keyword, carBrands,carModels,priceMin,priceMax,yearMin,yearMax,seats,carGear,carFuelType);
        return ConditionClassify(cars);
    }

    @Override
    public List<CarDetailCard> GetAllSecondHandCarsSearch(String keyword, String[] carPrice, String[] carYear, String carFuelType, List<String> carBrands, List<String> carModels, double carSeats, String carGear, double carMileage) {
        if(carBrands.size() == 0 && carModels.size() == 0){
            carBrands = new ArrayList<>();
            List<CarBrand> carBrand = carBrandRepository.findAll();
            for (int i = 0; i < carBrand.size(); i++) {
                carBrands.add(carBrand.get(i).getBrandName());
            }
            carModels = new ArrayList<>();
            List<CarModel> carModel = carModelRepository.findAll();
            for (int i = 0; i < carModel.size(); i++) {
                carModels.add(carModel.get(i).getModelName());
            }
        }
        double priceMin = Double.parseDouble(carPrice[0]);
        double priceMax = Double.parseDouble(carPrice[1]);
        double yearMin = Double.parseDouble(carYear[0]);
        double yearMax = Double.parseDouble(carYear[1]);
        if(carMileage == 70001.0){
            carMileage = 100000000;
        }
        List<Double> seats = new ArrayList<>();
        if(carSeats == 0){
            seats.add(2.0);
            seats.add(4.0);
            seats.add(5.0);
            seats.add(7.0);
        }else{
            seats.add(carSeats);
        }
        List<Car> cars = carRepository.searchSecondCar(keyword, carBrands,carModels,priceMin,priceMax,yearMin,yearMax,seats,carGear,carFuelType,carMileage);
        return ConditionClassify(cars);
    }

    @Override
    public List<CarDetailCard> GetAllSecondHandCars() {
        List<Car> cars = carRepository.findSecondHandCondition();
        return ConditionClassify(cars);
    }

    @Override
    public List<CarDetailCard> GetMyCars(String username) {
        User user = userRepository.findUserByUsernameForProfile(username);
        List<Car>  cars = carRepository.findCarByUser(user);
        return ConditionClassify(cars);
    }

    @Override
    public ResponseEntity<CarDetailEdit> GetCarDetailForEdit(int carId, int userId) {
        try{
            Car car = carRepository.findByIdAndUserid(carId,userId);
//            if(userId != car.getUser().getUserId()){
//                return null;
//            }
            CarDetailEdit carDetailEdit = new CarDetailEdit();
            carDetailEdit.setCarId(car.getCarId());
            carDetailEdit.setUserId(car.getUser().getUserId());
            carDetailEdit.setCarBrand(car.getModelId().getCarBrand().getBrandName());
            carDetailEdit.setCarModel(car.getModelId().getModelName());
            carDetailEdit.setCarGearType(car.getCarGearType());
            carDetailEdit.setCarPrice(car.getCarPrice());
            carDetailEdit.setCarYear(car.getCarYear());
            carDetailEdit.setCarSeats(car.getCarSeats());
            carDetailEdit.setCarHorsePower(car.getCarHorsePower());
            carDetailEdit.setCarDesc(car.getCarDesc());
            carDetailEdit.setCarAddress(car.getCarAddress());
            carDetailEdit.setCarFuelConsumption(car.getCarFuelConsumption());
            carDetailEdit.setCarFuelType(car.getCarFuelType());
            carDetailEdit.setCarColor(car.getCarColor());
            carDetailEdit.setCarGas(car.getCarGas());
            carDetailEdit.setCarMileage(car.getCarMileage());
            carDetailEdit.setCarCondition(car.getCarCondition());
            carDetailEdit.setCarHeader(car.getCarHeader());
            carDetailEdit.setCarEVRange(car.getCarEVRange());
            List<ImageDetail> imageDetailsOne = new ArrayList<>();
            List<CarImage> carImagesOne = carImageRepository.findCarImageByCarIdWhereStatusOne(car.getCarId());
            for (int i = 0; i < carImagesOne.size(); i++) {
                ImageDetail imageDetail = new ImageDetail();
                imageDetail.setCarImage(carImagesOne.get(i).getCarImage());
                imageDetail.setImageId(carImagesOne.get(i).getCarImageId());
                imageDetailsOne.add(imageDetail);
            }
            List<ImageDetail> imageDetailsTwo = new ArrayList<>();

            List<CarImage> carImagesTwo = carImageRepository.findCarImageByCarIdWhereStatusTwo(car.getCarId());
            for (int i = 0; i < carImagesTwo.size(); i++) {
                ImageDetail imageDetail = new ImageDetail();
                imageDetail.setCarImage(carImagesTwo.get(i).getCarImage());
                imageDetail.setImageId(carImagesTwo.get(i).getCarImageId());
                imageDetailsTwo.add(imageDetail);
            }
            carDetailEdit.setCarImages(imageDetailsOne);
            carDetailEdit.setCarImagesDefect(imageDetailsTwo);
            return new ResponseEntity<>(carDetailEdit, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public void AddCar(String carAddress, String carBrandName, String carColor, String carCondition, String carDesc, double carEVRange, double carFuelConsumption, String carFuelType, Boolean carGas, String carGearType, double carHorsePower, double carMileage, String carModelName, double carPrice, double carSeats, double carYear,String carHeader,int userId,List<MultipartFile> carImage,List<MultipartFile> carImageDefect) {
        Car addCar = new Car();
        CarModel carModel = carModelRepository.findCarModelByModelName(carModelName);
        User user = userRepository.findUserById(userId);
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

    @Override
    public void EditCarData(String carAddress, String carBrandName, String carColor, String carCondition, String carDesc, double carEVRange,
                            double carFuelConsumption, String carFuelType, Boolean carGas, String carGearType, double carHorsePower,
                            double carMileage, String carModelName, double carPrice, double carSeats, double carYear,
                            String carHeader, List<MultipartFile> carImage, List<MultipartFile> carImageDefect,
                            int[] carImageIdDelete,int carId) {
        CarModel carModel = carModelRepository.findCarModelByModelName(carModelName);
        carRepository.UpdateCarDetail(carAddress,carColor,carCondition,carDesc,carEVRange,carFuelConsumption,carFuelType,carGas,carGearType,carHorsePower,carMileage,carPrice,carSeats,carYear,carModel,carHeader,carId);
        if(carImageIdDelete != null){
            for (int i = 0; i < carImageIdDelete.length; i++) {
                carImageRepository.DeleteCarImageByID(carImageIdDelete[i]);
            }
        }

    }

    public List<CarDetailCard> ConditionClassify(List<Car> cars){
        List<CarDetailCard> carResult = new ArrayList<>();
        for (int i = 0; i<cars.size();i++){
            CarDetailCard car = new CarDetailCard();
            List<CarImageResponse> images = new ArrayList<CarImageResponse>();
            car.setCarId(cars.get(i).getCarId());
            car.setCarGearType(cars.get(i).getCarGearType());
            car.setCarPrice(cars.get(i).getCarPrice());
            car.setCarAddress(cars.get(i).getCarAddress());
            car.setCarMileage(cars.get(i).getCarMileage());
            car.setCarFuelType(cars.get(i).getCarFuelType());
            car.setCarHeader(cars.get(i).getCarHeader());
            car.setCarImage(carImageRepository.findCarImageByCarId(cars.get(i).getCarId()).get(0).getCarImage());
            car.setUsername(cars.get(i).getUser().getUsername());
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
        }else if(
                ((recTemp.getCarFuelType().equals("ไฮบริด") && norCar.getCarFuelType().equals("ไฮบริด")) ||
                (!recTemp.getCarFuelType().equals("ไฮบริด") && !norCar.getCarFuelType().equals("ไฮบริด"))) && !(recTemp.getCarFuelType().equals("EV") || norCar.getCarFuelType().equals("EV"))
        ){
            tempEuclideanDistance = tempEuclideanDistance +
                    (Math.pow(recTemp.getCarFuelConsumption()-norCar.getCarFuelConsumption(),2));
        }
        tempEuclideanDistance = Math.sqrt(tempEuclideanDistance);
        return tempEuclideanDistance;
    }
}
