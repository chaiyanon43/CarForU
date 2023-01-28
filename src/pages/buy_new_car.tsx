import SearchCar from "components/seachCar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import style from '../styles/NewCar.module.css'
const BuyNewCar = () => {
    const carDetail = [
        {
            header: "Honda Civic",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 1",
            url: "https://carnetwork.s3.ap-southeast-1.amazonaws.com/file/c01c1c497d9240a29dc5c589b9730ecc.jpg"

        },
        {
            header: "Toyota Altis",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 2",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2022/06/40.1-TOYOTA-COROLLA-ALTIS.jpg"
        },
        {
            header: "Toyota Yaris Ativ 2022",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 3",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2022/08/All-New-Toyota-Yaris-Ativ-2022-AutoinfoOnline-33.jpg"
        },
        {
            header: "Honda jazz",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 4",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2021/11/new-Honda-Jazz-Grey-Limited-2022-AutoinfoOnline-9-1024x682.jpg"
        },
        {
            header: "ISUZU D-max",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that feat is a literary genre: a succinct fictional story, in prose or verse, that feat is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 5",
            url: "https://www.9carthai.com/wp-content/uploads/2021/06/Hi-Lander_Opaque-01.png"
        },
        {
            header: "Nissan Kicks",
            detail: "car detail 6",
            url: "https://www.ananmoney.com/wp-content/uploads/2022/07/Nissan-Kicks-2022-17.png"
        },
    ]
    const [searchDetail, setSearchDetail] = useState<boolean>(false)
    const [arrow,setArrow] = useState<String>("pi pi-angle-down")
    return (
        <div className={style["main-container"]}>
            <div className={style["search-box"]} style={{height:`${searchDetail ? 'auto':''}`}}>
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword" />
                    <Button icon="pi pi-search" className="p-button-warning" />
                </div>
                <div className={style["search-detail"]}>
                    {searchDetail && <SearchCar/>}
                    <i onClick={() => {
                        setSearchDetail(!searchDetail)
                        setArrow(searchDetail ? "pi pi-angle-down":"pi pi-angle-up")
                    }} className={arrow} style={{ 'fontSize': '22px'}}></i>
                </div>
            </div>
            <div className={style["card-container"]}>
                {carDetail.map((e, index) => {
                    return (
                        <div key={index} className={style["card"]}>
                            <div className={style["image-container"]}>
                                <img src={e.url}></img>
                            </div>
                            <div className={style["car-detail"]}>
                                <h3>{e.header}</h3>
                                <p>{e.detail}</p>
                            </div>
                            <div className={style["footer"]}>
                                <i className="pi pi-heart"></i>
                            </div>

                        </div>
                    )
                })
                }
            </div>
        </div>
    );
}
export default BuyNewCar