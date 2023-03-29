export interface CarData {
    userId?: number,
    carId: number,
    carBrand: string,
    carModel: string,
    carGearType: string,
    carPrice: number,
    carYear: number,
    carColor: string,
    carSeats: number,
    carHorsePower: number,
    carDesc: string,
    carAddress: string,
    carFuelConsumption: number,
    carFuelType: string,
    carGas: boolean | string,
    carMileage: number,
    carCondition: string,
    carImage?: File[],
    carImageDefect?: File[]
    carImages?: CarImage[],
    carImagesDefect?: CarImage[],
    carEVRange: number,
    carHeader: string,
    carImageIDDelete?: number[],
    carImageDefectDelete?: number[]
}
export interface User {
    userId: number,
    name: string,
    phoneNumber:string,
    address:string,
    image: File
}
export interface carCard {
    carId: number,
    carHeader: string,
    carGearType: string,
    carPrice: number,
    carMileage: number,
    carAddress: string,
    carFuelType: string,
    carImage: string,
    username: string
}
export interface userForm {
    userId: number
    username: string;
    password?: string;
    name: string;
    image: File;
    phoneNumber: string;
    address: string;
    role?: string;
}
export interface FavoriteRequest {
    username: string,
    carId: number
}
export interface RecCarList {
    normalCar: RecCarDetail[],
    hybridCar: RecCarDetail[],
    evcar: RecCarDetail[],
}
export interface RecCarDetail {
    carId: number,
    carImage: string,
    carHeader: string,
    carPrice: number
}
export interface UserProfileTag {
    image: File,
    name: String
}
export interface loginForm {
    username: string;
    password: string;
}
export interface CarImage {
    imageId?: number,
    carImage: String;
}
export interface SellForm {
    carHeader: String,
    carAddress: string,
    carColor: string,
    carCondition: string,
    carDesc: string,
    carEVRange: number,
    carFuelConsumption: number,
    carFuelType: string,
    carGas: boolean | string,
    carGearType: string,
    carHorsePower: number,
    carMileage: number,
    carPrice: number,
    carSeats: number,
    carYear: number,
    carModel: string,
    carUserId: number,
    carBrand: string,
    carImage: File[],
    carImageDefect: File[]
    carId: string;
}
export interface itemImage {
    itemImageSrc: string,
    thumbnailImageSrc: string,
    alt: string,
    title: string
}
export interface models {
    modelId: number,
    modelName: string
}
export interface AllBrandsAndModels {
    brandId: number,
    brandName: string,
    models: models
}
export interface itemsMultipleDropDown {
    key: string,
    label: String,
    data: string,
    children: childrenDropDown[]
}
export interface childrenDropDown {
    key: string,
    label: String,
    data: string,
}
export interface notificationRequest {
    userId?: number|null,
    notificationContactType?:{ name: string, code: string },
    notificationContact?:string,
    notificationContactor?:number,
    carId?:number,
    notificationDesc?:string,
    contactorName?:string
    carHeader?:string,
    carImage?:File
}