import SearchCar from "components/seachCar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import style from '../../src/styles/NewCar.module.css'
import { CommonFunc } from "components/commonFunc";
import { carCard, CarData } from "components/interfaces";
import { CarService } from "services/CarService";
import CarCard from "components/carCard";
export interface BuyCar {
    isSecond?: boolean;
}
const BuyNewCar = (props: BuyCar) => {
    const { isSecond } = props
    const commonFunc = new CommonFunc();
    const [searchDetail, setSearchDetail] = useState<boolean>(false)
    const [arrow, setArrow] = useState<string>("pi pi-angle-down")
    const [data, setData] = useState<carCard[]>([])
    const [favCarId, setFavCarId] = useState<number[]>([])
    const carService = new CarService
    const getAllData = () => {
        if (!isSecond) {
            const response = carService.getCarFirstHand();
            response.then((res) => {
                setData!(res)
            })
        }else{
            const response = carService.getCarSecondHand();
            response.then((res) => {
                setData!(res)
            })
        }

        getFavId()
    }
    const getFavId = () => {
        const responseFav = carService.getFavoriteCarsId(sessionStorage.getItem('user')!)
        responseFav.then((res) => {
            setFavCarId(res)
        })
    }
    useEffect(() => {
        getAllData()
    }, [])
    const goToDetail = () => {
        window.location.href = "/car-detail"
    }

    return (
        <div className={style["main-container"]}>
            <div className={style["search-box"]} style={{ height: `${searchDetail ? 'auto' : ''}` }}>
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword"/>
                    <Button icon="pi pi-search" className="p-button-warning" />
                </div>
                {searchDetail && <SearchCar isSecond={isSecond} />}
                <div className={style['arrow-search']}>
                    <i onClick={() => {
                        setSearchDetail(!searchDetail)
                        setArrow(searchDetail ? "pi pi-angle-down" : "pi pi-angle-up")
                    }} className={arrow} style={{ 'fontSize': '24px' }}></i>
                </div>
            </div>
            <div className={style["card-container"]}>
                {data.map((e, index) => {
                    return (
                        <>
                            <CarCard carDetail={e} carFavId={favCarId} getFavId={getFavId} />
                        </>

                    )
                })
                }
            </div>
        </div>
    );
}
export default BuyNewCar