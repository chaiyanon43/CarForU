import SearchCar from "components/seachCar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import style from '../../src/styles/NewCar.module.css'
import Image from "next/image";
import carGear from "../../images/gearbox.svg"
import miles from "../../images/medium.png"
import fuel from "../../images/fuel.png"
import position from "../../images/position.png"
import Link from 'next/link'
export interface BuyCar {
    isSecond?: boolean;
}
const BuyNewCar = (props: BuyCar) => {
    const { isSecond } = props
    const carDetail = [
        {
            id:1,
            header: "Honda Civic",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 1",
            url: "https://carnetwork.s3.ap-southeast-1.amazonaws.com/file/c01c1c497d9240a29dc5c589b9730ecc.jpg"

        },
        {
            id:2,
            header: "Toyota Altis",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 2",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2022/06/40.1-TOYOTA-COROLLA-ALTIS.jpg"
        },
        {
            id:3,
            header: "Toyota Yaris Ativ 2022",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 3",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2022/08/All-New-Toyota-Yaris-Ativ-2022-AutoinfoOnline-33.jpg"
        },
        {
            id:4,
            header: "Honda jazz",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 4",
            url: "https://www.autoinfo.co.th/wp-content/uploads/2021/11/new-Honda-Jazz-Grey-Limited-2022-AutoinfoOnline-9-1024x682.jpg"
        },
        {
            id:5,
            header: "ISUZU D-max",
            detail: "Fable is a literary genre: a succinct fictional story, in prose or verse, that feat is a literary genre: a succinct fictional story, in prose or verse, that feat is a literary genre: a succinct fictional story, in prose or verse, that features animals, legendary creatures, plants, inanimate objects, or forces of nature that are anthropomorphized, and that illustrates or leads to a particular moral lesson (a ), which may at the end be added explicitly as a concise maxim or saying. 5",
            url: "https://www.9carthai.com/wp-content/uploads/2021/06/Hi-Lander_Opaque-01.png"
        },
        {
            id:6,
            header: "Nissan Kicks",
            detail: "car detail 6",
            url: "https://www.ananmoney.com/wp-content/uploads/2022/07/Nissan-Kicks-2022-17.png"
        },
    ]
    const [searchDetail, setSearchDetail] = useState<boolean>(false)
    const [arrow, setArrow] = useState<string>("pi pi-angle-down")


    const goToDetail = () => {
        window.location.href = "/car-detail"
    }
    return (
        <div className={style["main-container"]}>
            <div className={style["search-box"]} style={{ height: `${searchDetail ? 'auto' : ''}` }}>
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword" />
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
                {carDetail.map((e, index) => {
                    return (
                        <>
                            <Link href={'/car-detail/' + index} key={e.id}>
                                <div key={index} className={style["card"]}>
                                    <div className={style["image-container"]}>
                                        <img src={e.url}></img>
                                    </div>
                                    <div className={style["car-detail"]}>
                                        <div className={style["detail-header"]}>
                                            <h3>{e.header}</h3>
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
                                            <p>: เกียร์ออโต้</p>
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
                                            <p>: เบนซิล</p>
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
                                            <p>: กรุงเทพ</p>
                                        </div>
                                        <div className={style["detail-box"]}>
                                            <h3>760,000 บาท</h3>
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