export interface CarData{
    carId:number,
    carBrand:String,
    carModel:String,
    carGearType:String,
    carPrice:number,
    carYear:number,
    carSeats:number,
    carHorsePower:number,
    carDesc:String,
    carAddress:String,
    carFuelConsumption:number,
    carFuelType:String,
    carGas:boolean,
    carMileage:number,
    carCondition:String,
    carImage:CarImage[],
}
export interface CarImage{
    carImage:String;
}
export interface SellForm{
    carHeader: String,
    carAddress:string,
    carColor:string,
    carCondition:string,
    carDesc:string,
    carEVRange:number,
    carFuelConsumption:number,
    carFuelType:string,
    carGas:boolean | string,
    carGearType:string,
    carHorsePower:number,
    carMileage:number,
    carPrice:number,
    carSeats:number,
    carYear:number,
    carModel:string,
    carUserId:number,
    carBrand:string,
    carImage:File[],
    carImageDefect:File[]
}