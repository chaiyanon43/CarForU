import axios from "../axios.config"
import { CarData, FavoriteRequest } from "components/interfaces";
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
            return await axios.get('http://localhost:8080/getCar', {
                params: {
                    carId: parseInt(carId)
                }
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get car detail Error!", {
                duration: 5,
            });
        }
    }
    async getCarFirstHand(){
        try {
            return await axios.get("http://localhost:8080/all-first-hand-car")
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get cars Error!", {
                duration: 5,
            });
        }
    }
    async getCarSecondHand(){
        try {
            return await axios.get("http://localhost:8080/all-second-hand-car")
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get cars Error!", {
                duration: 5,
            });
        }
    }
    async getFavoriteCars(username:string){
        try {
            return await axios.get("http://localhost:8080/getFavCar",{
                params:{username:username}
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Favorite Cars Error!", {
                duration: 5,
            });
        }
    }
    async getFavoriteCarsId(username:string){
        try {
            return await axios.get("http://localhost:8080/getFavCarId",{
                params:{username:username}
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Favorite Cars Error!", {
                duration: 5,
            });
        }
    }
    async deleteFavoriteCar(favCar:FavoriteRequest){
        try {
            await axios.delete("http://localhost:8080/unlikeCar", {data:favCar} )
            .then((res)=>{
                toaster.success(res.data, {
                    duration: 5,
                });
            })
        }catch{
            toaster.success("delete error", {
                duration: 5,
            });
        }
    }
    async addToFavoriteCar(favCar:FavoriteRequest){
        try {
            await axios.post('http://localhost:8080/likeCar', favCar)
            .then((res)=>{
                toaster.success(res.data, {
                    duration: 5,
                });
            })
        }catch{
            toaster.success("Add to favorite error", {
                duration: 5,
            });
        }
    }
    async getMyCars(username:string){
        try {
            return await axios.get("http://localhost:8080/myCars",{
                params:{username:username}
            })
                .then((res) => res.data)
        } catch (err: any) {
            toaster.danger("Get Cars Error!", {
                duration: 5,
            });
        }
    }
}