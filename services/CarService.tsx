import axios from "../axios.config"
import { CarData, carRec, FavoriteRequest } from "components/interfaces";
import { toaster } from "evergreen-ui";

export class CarService {
    async getBrandList() {
        try {
            return await axios.get('http://localhost:8080/getAllBrand')
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get Brand List Error!", {
                duration: 5,
            });
        }
    }
    async getAllBanedCars() {
        try {
            return axios.get('http://localhost:8080/getBanedCars')
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get Car List Error!", {
                duration: 5,
            });
        }
    }

    async getModelList(carBrandName: string) {
        try {
            return await axios.get('http://localhost:8080/get-model', {
                params: {
                    brandName: carBrandName
                }
            })
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get Model List Error!", {
                duration: 5,
            });
        }
    }
    async getCarDetail(carId: any) {
        try {
            return await axios.get<carRec>('http://localhost:8080/getCar', {
                params: {
                    carId: parseInt(carId)
                }
            })
                .then((res) => res.data)
                .catch((err) => {
                    toaster.danger("Get car detail Error!", {
                        duration: 5,
                    });
                })
        } catch (err: any) {
            toaster.danger("Get car detail Error!", {
                duration: 5,
            });
        }
    }async getCarDetailForAdmin(carId: any) {
        try {
            return axios.get<carRec>('http://localhost:8080/getCarForAdmin', {
                params: {
                    carId: parseInt(carId)
                }
            })
                .then((res) => res.data)
                .catch((err) => {
                    toaster.danger("Get car detail Error!", {
                        duration: 5,
                    });
                })
        } catch (err: any) {
            toaster.danger("Get car detail Error!", {
                duration: 5,
            });
        }
    }
    async getCarFirstHandSearch(keyword?: string, carPrice?: [], carYear?: [], carFuelType?: string, carBrands?: string[], carModels?: string[], carSeats?: number, carGear?: string) {
        try {
            return await axios.get("http://localhost:8080/all-first-hand-car-search", {
                params: {
                    "searchKeyword": keyword,
                    "carPrice": carPrice[0] + "," + carPrice[1],
                    "carYear": carYear[0] + "," + carYear[1],
                    "carFuelType": carFuelType,
                    "carBrands": carBrands
                    // carModels:carModels ? carModels.map((e)=>{ return `${e},`}):'',
                    // carSeats:carSeats,
                    // carGear:carGear
                }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get cars Error!", {
                duration: 5,
            });
        }
    }
    async getCarFirstHand() {
        try {
            const status = sessionStorage.getItem('role') === 'admin' ? 2:1
            return await axios.get("http://localhost:8080/all-first-hand-car",{params:{status:status}})
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get cars Error!", {
                duration: 5,
            });
        }
    }
    async getCarSecondHand() {
        try {
            const status = sessionStorage.getItem('role') === 'admin' ? 2:1
            return await axios.get("http://localhost:8080/all-second-hand-car",{params:{status:status}})
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get cars Error!", {
                duration: 5,
            });
        }
    }
    async getFavoriteCars(username: string) {
        try {
            return await axios.get("http://localhost:8080/getFavCar", {
                params: { username: username }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Favorite Cars Error!", {
                duration: 5,
            });
        }
    }
    async getFavoriteCarsId(username: string) {
        try {
            return await axios.get("http://localhost:8080/getFavCarId", {
                params: { username: username }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Favorite Cars Error!", {
                duration: 5,
            });
        }
    }
    async deleteFavoriteCar(favCar: FavoriteRequest) {
        try {
            await axios.delete("http://localhost:8080/unlikeCar", { data: favCar })
                .then((res) => {
                    toaster.success(res.data, {
                        duration: 5,
                    });
                })
        } catch {
            toaster.danger("delete error", {
                duration: 5,
            });
        }
    }
    async addToFavoriteCar(favCar: FavoriteRequest) {
        try {
            await axios.post('http://localhost:8080/likeCar', favCar)
                .then((res) => {
                    toaster.success(res.data, {
                        duration: 5,
                    });
                })
        } catch {
            toaster.danger("Add to favorite error", {
                duration: 5,
            });
        }
    }
    async addBrand(brandName: string) {
        try {
            await axios.post('http://localhost:8080/addBrand', {brandName:brandName})
                .then((res) => {
                    toaster.success(res.data, {
                        duration: 5,
                    });
                })
        } catch {
            toaster.danger("Add brand error", {
                duration: 5,
            });
        }
    }
    async getMyCars(username: string) {
        try {
            return await axios.get("http://localhost:8080/myCars", {
                params: { username: username }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Cars Error!", {
                duration: 5,
            });
        }
    }
    async getAllBrandsAndModels() {
        try {
            return await axios.get("http://localhost:8080/getAllBrandsAndModels")
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Brands And Models Error!", {
                duration: 5,
            });
        }
    }
    async getCarDetailForEdit(carId: number, userId: number) {
        try {
            return await axios.get("http://localhost:8080/getCarDetail", {
                params:
                {
                    carId: carId,
                    userId: userId
                }
            })
                .then((res) => res.data)
        } catch (err: any) {
            return false
        }
    }
    async editCarData(carDetail: CarData) {
        try {
            await axios.put('http://localhost:8080/edit-car-data', {
                carHeader: carDetail?.carHeader,
                carCondition: carDetail?.carCondition,
                carFuelType: carDetail?.carFuelType,
                carBrand: carDetail?.carBrand,
                carModel: carDetail?.carModel,
                carColor: carDetail?.carColor,
                carGearType: carDetail?.carGearType,
                carHorsePower: carDetail?.carHorsePower,
                carMileage: carDetail?.carMileage,
                carSeats: carDetail?.carSeats,
                carFuelConsumption: carDetail?.carFuelConsumption,
                carYear: carDetail?.carYear,
                carEVRange: carDetail?.carEVRange,
                carGas: carDetail?.carGas === "ติดตั้ง" ? true : false,
                carDesc: carDetail?.carDesc,
                carAddress: carDetail?.carAddress,
                carPrice: carDetail?.carPrice,
                carImageIDDelete: carDetail.carImageIDDelete,
                carImage: carDetail.carImage,
                carImageDefect: carDetail.carImageDefect,
                carId: carDetail.carId
            })
                .then((res) => {
                    toaster.success(res.data, {
                        duration: 5,
                    });
                })
        } catch {
            toaster.success("Edit car data error", {
                duration: 5,
            });
        }
    }
    async banCar(carId: number) {
        axios.patch('http://localhost:8080/banCar',
            { carId: carId }
        )
            .then((res) => {
                toaster.success(res.data, {
                    duration: 5,
                });
            }).catch((err) => {
                toaster.danger("Ban car error", {
                    duration: 5,
                });
            })
    }
    async unBanCar(carId: number) {
        axios.patch('http://localhost:8080/unBanCar',
            { carId: carId }
        )
            .then((res) => {
                toaster.success(res.data, {
                    duration: 5,
                });
            }).catch((err) => {
                toaster.danger("Unban car error", {
                    duration: 5,
                });
            })
    }
    async deleteCar(carId: number) {
        axios.delete('http://localhost:8080/deleteCar',
            {params:{ carId: carId }}
        )
            .then((res) => {
                toaster.success(res.data, {
                    duration: 5,
                });
            }).catch((err) => {
                toaster.danger("Delete error", {
                    duration: 5,
                });
            })
    }
    async getCarTable(userId:number) {
        try {
            return axios.get('http://localhost:8080/getCarDetailTable',
            {params:{userId:userId}})
                .then((res) => res.data);
        } catch (err: any) {
            toaster.danger("Get Car List Error!", {
                duration: 5,
            });
        }
    }
}