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
    carFavId?: number[];
    getFavId?:any;
    isMine?:boolean;
}
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toaster } from 'evergreen-ui';
import { CarService } from 'services/CarService';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

const CarCard = (props: CarCardForm) => {
    const commonFunc = new CommonFunc();
    const carService = new CarService();
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDialogDelete, setDisplayDialogDelete] = useState(false);
    const { carDetail, carFavId ,getFavId,isMine} = props
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
            {sessionStorage.getItem("user") === carDetail.username ? <i className="pi pi-pencil"></i>:carFavId?.find(num => {
                return num === carDetail.carId
            }) ? <i onClick={() => setDisplayDialogDelete(true)} className="pi pi-heart-fill"></i> : <i onClick={() => setDisplayDialog(true)} className="pi pi-heart"></i>}
            <Dialog header="เพิ่มรถยนต์ในรายการโปรด" visible={displayDialog} style={{ width: '400px' }} footer={renderFooter()} onHide={() => onHide()}>
            </Dialog>
            <Dialog header="ลบรถยนต์ออกจากรายการโปรด" visible={displayDialogDelete} style={{ width: '400px' }} footer={renderFooterDelete()} onHide={() => onHideDelete()}>
            </Dialog>

        </div>

    )
}
export default CarCard