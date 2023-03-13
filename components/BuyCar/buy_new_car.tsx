import SearchCar from "components/seachCar";
import React, { use } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import style from '../../src/styles/NewCar.module.css'
import Image from "next/image";
import carGear from "../../images/gearbox.svg"
import miles from "../../images/medium.png"
import fuel from "../../images/fuel.png"
import position from "../../images/position.png"
import Link from 'next/link'
import axios from 'axios';
import { CommonFunc } from "components/commonFunc";
import { CarData } from "components/interfaces";
export interface BuyCar {
    isSecond?: boolean;
}
const BuyNewCar = (props: BuyCar) => {
    const { isSecond } = props
    const commonFunc = new CommonFunc();
    const [searchDetail, setSearchDetail] = useState<boolean>(false)
    const [arrow, setArrow] = useState<string>("pi pi-angle-down")
    const [data,setData] = useState<CarData[]>([])
    const getAllData=()=>{
        axios.get("http://localhost:8080/all-first-hand-car")
        .then((res:any)=>{
            setData(res.data)
            console.log(res.data)
        })
    }
    useEffect(()=>{
        getAllData()
    },[])
    const goToDetail = () => {
        window.location.href = "/car-detail"
    }
    //const [carSearchList, setCarSearchList] = React.useState<
    //{carBrand:string}[]|undefined>(data);
    
    const [text, setText] = React.useState('');
    
    //const seachCar = document.querySelector('.p-inputgroup');
    //const inputTextSearch = seachCar?.querySelector("input");
    //seachCar.onkeyup = () => {

    //}

    //const suggBox = seachCar?.querySelector

    const handdleOnClick = () => {
        setData(data)
        //console.log()
        const findCars = 
        data && data.length != 0 && 
        data.filter((car) => car.carBrand == text);
        setData(findCars);
    }

    //const [carSearch, carSearchList] = useState([]);
    //const [searchCar] = useState(["All"])
    //const handdleOnClick = () =>{
    //    setData(data)
    //    return data.filter((data) => {
    //        return searchCar.some((textFind) => {
    //            return (
    //                data[textFind].toString().toLowerCase().indexOf(text.toLowerCase()) > -1
    //            );
    //        });
    //    });
    //}

    return (
        <div className={style["main-container"]}>
            <div className={style["search-box"]} style={{ height: `${searchDetail ? 'auto' : ''}` }}>
                <div className="p-inputgroup">
                    <InputText id="text" type={text} placeholder="Keyword" value={text} onChange={(e) => setText(e.target.value)}/>
                    <Button disabled={!text} onClick={handdleOnClick} icon="pi pi-search" className="p-button-warning" />
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
                            <Link href={'/car-detail/' + e.carId} key={e.carId}>
                                <div key={index} className={style["card"]}>
                                    <div className={style["image-container"]}>
                                        <img src={`data:image/jpeg;base64,${e.carImage[0].carImage}`}></img>
                                    </div>
                                    <div className={style["car-detail"]}>
                                        <div className={style["detail-header"]}>
                                            <h3>{e.carHeader}</h3>
                                            <i className="pi pi-heart"></i>
                                        </div>

                                        <div className={style["detail-box"]}>
                                            <Button
                                                icon={
                                                    <Image
                                                        id="icon"
                                                        src={carGear}
                                                        width={"22"}
                                                        height={"22"}
                                                        alt={"PaperCheck"}
                                                    />
                                                }
                                            />
                                            <p>: {e.carGearType}</p>
                                        </div>
                                        <div className={style["detail-box"]}>
                                            <Button
                                                icon={
                                                    <Image
                                                        src={miles}
                                                        width={"22"}
                                                        height={"22"}
                                                        alt={"PaperCheck"}
                                                    />
                                                }
                                            />
                                            <p>: 0-5k km.</p>
                                        </div>
                                        <div className={style["detail-box"]}>
                                            <Button
                                                icon={
                                                    <Image
                                                        src={fuel}
                                                        width={"22"}
                                                        height={"22"}
                                                        alt={"PaperCheck"}
                                                    />
                                                }
                                            />
                                            <p>: {e.carFuelType}</p>
                                        </div>
                                        <div className={style["detail-box"]}>
                                            <Button
                                                icon={
                                                    <Image
                                                        src={position}
                                                        width={"22"}
                                                        height={"22"}
                                                        alt={"PaperCheck"}
                                                    />
                                                }
                                            />
                                            <p>: {e.carAddress}</p>
                                        </div>
                                        <div className={style["detail-box"]}>
                                            <h3>฿{commonFunc.numberWithCommas(e.carPrice)} </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>

                    )
                })
                }
            </div>
        </div>
    );
}
export default BuyNewCar