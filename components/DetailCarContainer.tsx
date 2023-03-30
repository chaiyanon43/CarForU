import style from "../src/styles/DetailPage.module.css"
import { CarData } from "./interfaces";
import carIcon from "../images/car-wash.png"
import calendar from "../images/calendar.png"
import mile from "../images/medium.png"
import fuel from "../images/fuel.png"
import fuelEV from "../images/fuel-for-ev.png"
import road from "../images/road.png"
import color from "../images/wheel.png"
import seat from "../images/car-chair.png"
import Image from "next/image";
import carGear from "../images/gearbox.svg"
import horsePower from "../images/horsepower.png"
import { CommonFunc } from "./commonFunc";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";


interface DetailProps {
    carDetail: CarData;
}

const DetailCarContainer = (props: DetailProps) => {
    const { carDetail } = props
    const commonFunc = new CommonFunc();
    const specificDetail = [
        {
            header: "เกียร์",
            data:carDetail.carGearType,
            icon: carGear
        },
        {
            header: "สภาพ",
            data:carDetail.carCondition,
            icon: carIcon
        }, {
            header: "ปีรถยนต์",
            data:carDetail.carYear,
            icon: calendar
        }, {
            header: "เลขไมล์",
            data:carDetail.carCondition === "มือหนึ่ง" ? "0 - 5,000":commonFunc.numberWithCommas(carDetail.carMileage) + " กม.",
            icon: mile
        }, {
            header: "ประเภทเชื้อเพลิง",
            data:carDetail.carFuelType,
            icon: fuel
        }, {
            header: "สี",
            data:carDetail.carColor,
            icon: color
        },  {
            header: "จำนวนที่นั่ง",
            data:carDetail.carSeats,
            icon: seat
        }
        ,  {
            header: "แรงม้า",
            data:carDetail.carHorsePower,
            icon: horsePower
        }, {
            header: carDetail.carFuelType !== "EV" ? "อัตราสิ้นเปลือง": "ระยะทาง/การชาร์จ",
            data:carDetail.carFuelType !== "EV" ? `${carDetail.carFuelConsumption} km/l`: `${carDetail.carEVRange} km`,
            icon: carDetail.carFuelType !== "EV" ? fuelEV: road
        }
    ]
    return (
        <div className={style['detail-main-container']}>
            <div className={style['specific-detail-main']}>
                {specificDetail.map((e,index) => {
                    return (
                        <div key={index} className={style['specific-detail']}>
                            <Image
                                id="icon"
                                src={e.icon}
                                width={"26"}
                                height={"26"}
                                alt={"PaperCheck"}
                            />
                            <h4>{e.header}</h4>
                            <label>{e.data}</label>
                        </div>
                    )
                })}
            </div>
            <div className={style["additional-detail"]}>
                <h3>รายละเอียดเพิ่มเติม</h3>
                <InputTextarea autoResize={true} rows={5} disabled id={style["desc-detail"]}>{carDetail.carDesc}</InputTextarea>
                <h3>ที่อยู่</h3>
                <InputTextarea autoResize={true} rows={5} disabled id={style["desc-detail"]}>{carDetail.carAddress}</InputTextarea>
            </div>
            <p id={style["price"]}>{commonFunc.numberWithCommas(carDetail.carPrice)} บาท</p>

        </div>

    )
}
export default DetailCarContainer