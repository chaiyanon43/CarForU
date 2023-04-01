import CarCard, { CarCardForm } from "components/carCard"
import { carCard, CarData } from "components/interfaces"
import { useEffect, useState } from "react"
import { CarService } from "services/CarService";
import style from "../../styles/NewCar.module.css"
const BanedCar=()=>{
    const [carBaned,setCarBaned] = useState<carCard[]>([]);
    const carService = new CarService();
    const getCarBaned=()=>{
        const response = carService.getAllBanedCars()
        response.then((e)=>{
            setCarBaned(e)
        })
    }
    useEffect(()=>{
        getCarBaned()
    },[])
    return (
        <div className={style["main-container"]}>
                <div className={style["card-container"]}>
                    {carBaned ? carBaned.map((e, index) => {
                        return (
                            <>
                                <CarCard carDetail={e} setCarDetails={setCarBaned} isUnBan={true}/>
                            </>
                        )
                    }):null
                    }
                </div>
            </div>
    )
}
export default BanedCar