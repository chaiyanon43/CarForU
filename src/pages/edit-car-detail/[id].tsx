import { CarData } from "components/interfaces";
import SellCarPanel from "components/SellCar/sell_car_panel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CarService } from "services/CarService";

const EditCarDetail = () => {
    const router = useRouter();
    const { id } = router.query
    const [car, setCar] = useState<CarData>();
    const [err, setErr] = useState<boolean>(false);
    const carService = new CarService();
    const getCarDetail = (carId: number, userId: number) => {
        const response = carService.getCarDetailForEdit(carId, userId);
        response.then((res) => {
            if (!res) {
                setErr(true)
            } else {
                setCar(res)
            }

        })

    }
    useEffect(() => {
        if (!router.isReady) return;
        if (id && sessionStorage.getItem("userId")) {
            getCarDetail(Number(id), Number(sessionStorage.getItem("userId")))
        }
    }, [router.query.id, router.isReady]);
    if (car) {
        return (
            <><SellCarPanel carDetail={car} isEdit={true} /></>
        )
    }
    if (!car) {
        if (!err)
            return <>Loading...</>
        if (err) {
            return (<h1 style={{color:"#FEFEFE",margin:"50px auto",width:"fit-content"}}>No permission</h1>)
        }
    }



}
export default EditCarDetail;