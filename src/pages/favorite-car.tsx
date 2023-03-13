import FavoriteCarResult from "components/FavCar/favorite-car-result"
import { carCard } from "components/interfaces";
import { useEffect, useState } from "react";
import { CarService } from "services/CarService";

const FavoriteCar=()=>{
    const carService = new CarService();
    const [carCards,setCarCards] = useState<carCard[]>([])
    const [favCarId,setFavCarId] = useState<number[]>([])

    const getFavCar=()=>{
        const response = carService.getFavoriteCars(sessionStorage.getItem('user')!);
        response.then((res)=>{
            setCarCards!(res)
        })
        const responseFav = carService.getFavoriteCarsId(sessionStorage.getItem('user')!)
        responseFav.then((res)=>{
            setFavCarId(res)
        })
    }
    useEffect(()=>{
        getFavCar()
    },[])
    return (
        <>
            <FavoriteCarResult carCards={carCards} favCarId={favCarId} getFavCar={getFavCar} />
        </>
    )
}
export default FavoriteCar