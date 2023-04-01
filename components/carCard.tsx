import Link from 'next/link'
import { Button } from "primereact/button";
import Image from "next/image";
import carGear from "../images/gearbox.svg"
import miles from "../images/medium.png"
import fuel from "../images/fuel.png"
import position from "../images/position.png"
import style from '../src/styles/NewCar.module.css'
import { carCard, CarData, FavoriteRequest } from './interfaces';
import { CommonFunc } from './commonFunc';
export interface CarCardForm {
    carDetail: carCard;
    setCarDetails?: Dispatch<SetStateAction<carCard[]>>
    carFavId?: number[];
    getFavId?: any;
    isSecond?: boolean;
    isMine?: boolean;
    isUnBan?: boolean;
}
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toaster } from 'evergreen-ui';
import { CarService } from 'services/CarService';
import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction, useState } from 'react';

const CarCard = (props: CarCardForm) => {
    const commonFunc = new CommonFunc();
    const carService = new CarService();
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDialogDelete, setDisplayDialogDelete] = useState(false);
    const [displayBan, setDisplayBan] = useState(false);
    const [displayUnban, setDisplayUnban] = useState(false);
    const { carDetail, carFavId, getFavId, isMine, isSecond, setCarDetails, isUnBan } = props
    const acceptLiked = async () => {
        const carForm: FavoriteRequest = {
            username: sessionStorage.getItem('user')!,
            carId: carDetail.carId
        }
        await carService.addToFavoriteCar(carForm)
        getFavId();
    };

    const acceptUnlike = async () => {
        const carForm: FavoriteRequest = {
            username: sessionStorage.getItem('user')!,
            carId: carDetail.carId
        }
        await carService.deleteFavoriteCar(carForm)
        getFavId();
    };
    const onHide = () => {
        setDisplayDialog(false);
    }
    const onHideDelete = () => {
        setDisplayDialogDelete(false);
    }
    const onBanCar = () => {
        carService.banCar(carDetail.carId)
        if (!isSecond) {
            const response = carService.getCarFirstHand();
            response.then((res) => {
                setCarDetails!(res)
            })
        } else {
            const response = carService.getCarSecondHand();
            response.then((res) => {
                setCarDetails!(res)
            })
        }
    }
    const onUnbanCar = async () => {
        carService.unBanCar(carDetail.carId)
        const response = carService.getAllBanedCars()
        response.then((e)=>{
            setCarDetails!(e)
        })

    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => {
                    onHide()
                }} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => {
                    acceptLiked();
                    onHide()
                }} autoFocus />
            </div>
        );
    }
    const renderFooterBan = () => {
        return (
            <div>
                <Button label="ยกเลิก" icon="pi pi-times" onClick={() => {
                    setDisplayBan(false);
                }} className="p-button-text" />
                <Button label="ยืนยัน" icon="pi pi-check" onClick={() => {
                    onBanCar();
                    setDisplayBan(false);
                }} autoFocus />
            </div>
        );
    }
    const renderFooterUnban = () => {
        return (
            <div>
                <Button label="ยกเลิก" icon="pi pi-times" onClick={() => {
                    setDisplayUnban(false);
                }} className="p-button-text" />
                <Button label="ยืนยัน" icon="pi pi-check" onClick={() => {
                    onUnbanCar();
                    setDisplayUnban(false);
                }} autoFocus />
            </div>
        );
    }
    const renderFooterDelete = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => {
                    onHideDelete()
                }} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => {
                    acceptUnlike();
                    onHideDelete()
                }} autoFocus />
            </div>
        );
    }
    return (
        <div className={style["card"]}>
            <Link href={'/car-detail/' + carDetail.carId} key={carDetail.carId}>
                <div key={carDetail.carId} >
                    <div className={style["image-container"]}>
                        <img src={`data:image/jpeg;base64,${carDetail.carImage}`}></img>
                    </div>
                    <div className={style["car-detail"]}>
                        <div className={style["detail-header"]}>
                            <h3>{carDetail.carHeader}</h3>

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
                            <p>: {carDetail.carGearType}</p>
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
                            <p>: {isSecond ? commonFunc.numberWithCommas(carDetail.carMileage) : "0-5k"} km.</p>
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
                            <p>: {carDetail.carFuelType}</p>
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
                            <p>: {carDetail.carAddress}</p>
                        </div>
                        <div className={style["detail-box"]}>
                            <h3>฿{commonFunc.numberWithCommas(carDetail.carPrice)} </h3>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={style['header-icon-card']}>
                {isUnBan ? <i onClick={() => setDisplayUnban(true)} className="pi pi-lock-open"></i> : sessionStorage.getItem('role') === "admin" ? <i onClick={() => setDisplayBan(true)} className="pi pi-ban"></i> : sessionStorage.getItem("user") === carDetail.username ? <><Link href={'/edit-car-detail/' + carDetail.carId} key={carDetail.carId}><i className="pi pi-pencil"></i></Link></> : carFavId?.find(num => {
                    return num === carDetail.carId
                }) ? <i onClick={() => setDisplayDialogDelete(true)} className="pi pi-heart-fill"></i> : <i onClick={() => setDisplayDialog(true)} className="pi pi-heart"></i>}
            </div>
            <Dialog header="ยืนยันการแบน ?" visible={displayBan} style={{ width: '400px' }} footer={renderFooterBan()} onHide={() => setDisplayBan(false)}>
            </Dialog>
            <Dialog header="ยืนยันการปลดแบน ?" visible={displayUnban} style={{ width: '400px' }} footer={renderFooterUnban()} onHide={() => setDisplayUnban(false)}>
            </Dialog>
            <Dialog header="เพิ่มรถยนต์ในรายการโปรด" visible={displayDialog} style={{ width: '400px' }} footer={renderFooter()} onHide={() => onHide()}>
            </Dialog>
            <Dialog header="ลบรถยนต์ออกจากรายการโปรด" visible={displayDialogDelete} style={{ width: '400px' }} footer={renderFooterDelete()} onHide={() => onHideDelete()}>
            </Dialog>

        </div>

    )
}
export default CarCard