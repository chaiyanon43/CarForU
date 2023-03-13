import { carCard } from "components/interfaces";
import MyCarResult from "components/MyCar/my-car-result";
import { useEffect, useState } from "react";
import { CarService } from "services/CarService";

const MyCar = () => {
    const [myCars, setMyCars] = useState<carCard[]>([]);
    const carService = new CarService()
    const getMyCars = () => {
        const response = carService.getMyCars(sessionStorage.getItem("user")!);
        response.then((res) => {
            setMyCars!(res)
        })
    }
    useEffect(() => {
        getMyCars();
    }, [])
    return (
        <><MyCarResult myCars={myCars}/></>
    )
}
export default MyCar;