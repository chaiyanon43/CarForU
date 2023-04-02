import { CommonFunc } from "components/commonFunc";
import { CarData, itemImage, notificationRequest, RecCarList, User } from "components/interfaces";
import { useRouter } from "next/router"
import { Galleria } from 'primereact/galleria';
import { parse } from "querystring";
import { useCallback, useEffect, useRef, useState } from "react";
import { CarService } from "services/CarService";
import style from '../../styles/DetailPage.module.css'
import CarCalculate from "../CarCalculate";
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm } from "react-hook-form";
import DetailCarContainer from "components/DetailCarContainer";
import Link from "next/link";
import { NotificationService } from "services/Notification.service";
import { NotificationPanel } from "components/notificationPanel";

interface contactForm {
    contactTitle: { name: string, code: string },
    contactData: string,
    contactDesc: string
}
const Details = () => {
    const carService = new CarService();
    const router = useRouter();
    const { id } = router.query
    const [carId, setCarId] = useState<string | string[]>();
    const [user, setUser] = useState<User>();
    const [car, setCar] = useState<CarData>();
    const [carRec, setCarRec] = useState<RecCarList>();
    const [img, setImg] = useState<itemImage[]>([]);
    const [imgDefect, setImgDefect] = useState<itemImage[]>([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [displayDialogBan, setDisplayDialogBan] = useState(false);
    const [displayDialogUnban, setDisplayDialogUnban] = useState(false);
    const [isDefect, setIsDefect] = useState<boolean>(false)
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [isErr, setIsErr] = useState<boolean>(false)
    const [recLevel, setRecLevel] = useState<number[]>([])
    const { register, handleSubmit, getValues, watch, setValue, resetField, formState: { errors } } = useForm<notificationRequest>();
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    const noticationService = new NotificationService();

    const getCarDetail = useCallback((carId: string | string[]) => {
        if (sessionStorage.getItem('role') !== 'admin') {
            const response = carService.getCarDetail(carId)
            response.then((res) => {
                if (!res) {
                    setIsErr(true)
                    return
                }
                if (recLevel.length < 3) {
                    if (res.car.carFuelType === "เบนซิน" || res.car.carFuelType === "ดีเซล") {
                        recLevel.push(1)
                        recLevel.push(2)
                        recLevel.push(3)
                    } else if (res.car.carFuelType === "ไฮบริด") {
                        recLevel.push(2)
                        recLevel.push(1)
                        recLevel.push(3)
                    } else {
                        recLevel.push(3)
                        recLevel.push(2)
                        recLevel.push(1)
                    }
                }
                setUser!(res.user)
                setCar!(res.car)
                setCarRec!(res.recList)
                res.car.carImage.map((e) => {
                    if (img.length < res.car.carImage.length) {
                        img!.push({
                            itemImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            thumbnailImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            alt: 'Car : ' + e.index,
                            title: 'Car : ' + e.index
                        })
                    }

                })
                res.car.carImageDefect.map((e) => {
                    if (imgDefect.length < res.car.carImageDefect.length) {
                        imgDefect!.push({
                            itemImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            thumbnailImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            alt: 'Car : ' + e.index,
                            title: 'Car : ' + e.index
                        })
                    }

                })
            })
        } else {
            const response = carService.getCarDetailForAdmin(carId)
            response.then((res) => {
                if (!res) {
                    setIsErr(true)
                    return
                }
                setUser!(res.user)
                setCar!(res.car)
                res.car.carImage.map((e) => {
                    if (img.length < res.car.carImage.length) {
                        img!.push({
                            itemImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            thumbnailImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            alt: 'Car : ' + e.index,
                            title: 'Car : ' + e.index
                        })
                    }
                })
                res.car.carImageDefect.map((e) => {
                    if (imgDefect.length < res.car.carImageDefect.length) {
                        imgDefect!.push({
                            itemImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            thumbnailImageSrc: `data:image/jpeg;base64,${e.carImage}`,
                            alt: 'Car : ' + e.index,
                            title: 'Car : ' + e.index
                        })
                    }

                })
            })
        }

    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (id) {
            getCarDetail(id)
            setCarId(id)
        }

    }, [router.query.id, router.isReady, getCarDetail]);
    const itemTemplate = (item: itemImage) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item: itemImage) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }
    const renderFooter = () => {
        return (
            <div>
                <Button type="button" label="ยกเลิก" icon="pi pi-times" onClick={() => setDisplayDialog(false)} className="p-button-text" />
                <Button type="submit" label="ติดต่อ" onClick={handleSubmit(onContact)} icon="pi pi-check" />
            </div>
        );
    }
    const renderFooterBan = () => {
        return (
            <div>
                <Button type="button" label="ยกเลิก" icon="pi pi-times" onClick={() => setDisplayDialogBan(false)} className="p-button-text" />
                <Button type="submit" label="ยืนยัน" onClick={onBanCar} icon="pi pi-check" />
            </div>
        );
    }
    const renderFooterUnban = () => {
        return (
            <div>
                <Button type="button" label="ยกเลิก" icon="pi pi-times" onClick={() => setDisplayDialogUnban(false)} className="p-button-text" />
                <Button type="submit" label="ยืนยัน" onClick={onUnbanCar} icon="pi pi-check" />
            </div>
        );
    }
    const onContact: SubmitHandler<notificationRequest> = (noti) => {
        noti.carId = car?.carId,
            noti.userId = user?.userId
        noti.notificationContactor = Number(sessionStorage.getItem("userId"))
        noticationService.sendNotification(noti)
        setDisplayDialog(false)
    }
    const onBanCar = () => {
        carService.banCar(car.carId)
        setDisplayDialogBan(false)
    }
    const onUnbanCar = () => {
        carService.unBanCar(car.carId)
        getCarDetail(car?.carId)
        setDisplayDialogUnban(false)

    }
    const menu = useRef(null);
    const commonFunc = new CommonFunc();
    const recomendLevel = (level: number) => {
        if (level === 1) {
            return (
                <>
                    <h3 id={style["car-type"]}>NORMAL</h3>
                    <div className={style['car-rec-box']}>
                        {carRec?.normalCar.map((carNm,index) => {
                            return (
                                <div className={style['car-rec-inside']} key={carNm.carId} onClick={(e) => window.location.href = "/car-detail/" + carNm.carId}>
                                    <div className={style['car-rec-image-container']}>
                                        <img src={`data:image/jpeg;base64,${carNm.carImage}`} />
                                    </div>
                                    <div className={style['car-rec-text']}>
                                        <label id={style['header']}>{carNm.carHeader}</label>
                                        <label id={style['level']}>#{index+1}</label>
                                        <label id={style['data']}>{commonFunc.numberWithCommas(carNm.carPrice)} บาท</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
        } else if (level === 2) {
            return (
                <>
                    <h3 id={style["car-type"]}>HYBRID</h3>
                    <div className={style['car-rec-box']}>
                        {carRec?.hybridCar.map((carHb,index) => {
                            return (
                                <div className={style['car-rec-inside']} key={carHb.carId} onClick={(e) => window.location.href = "/car-detail/" + carHb.carId}>
                                    <div className={style['car-rec-image-container']}>
                                        <img src={`data:image/jpeg;base64,${carHb.carImage}`} />
                                    </div>
                                    <div className={style['car-rec-text']}>
                                        <label id={style['header']}>{carHb.carHeader}</label>
                                        <label id={style['level']}>#{index+1}</label>
                                        <label id={style['data']}>{commonFunc.numberWithCommas(carHb.carPrice)} บาท</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
        } else if (level === 3) {
            return (
                <>
                    <h3 id={style["car-type"]}>EV</h3>
                    <div className={style['car-rec-box']}>
                        {carRec?.evcar.map((carEv,index) => {
                            return (
                                <div className={style['car-rec-inside']} key={carEv.carId} onClick={(e) => window.location.href = "/car-detail/" + carEv.carId}>
                                    <div className={style['car-rec-image-container']}>
                                        <img src={`data:image/jpeg;base64,${carEv.carImage}`} />
                                    </div>
                                    <div className={style['car-rec-text']}>
                                        <label id={style['header']}>{carEv.carHeader}</label>
                                        <label id={style['level']}>#{index+1}</label>
                                        <label id={style['data']}>{commonFunc.numberWithCommas(carEv.carPrice)} บาท</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
        }
    }
    if (!car) {
        if (isErr) {
            return <>ไม่สามารถดูได้เนื่องจากประกาศถูกแบน</>
        }
        return <>Loading...</>
    } else {
        return (
            <div>
                <NotificationPanel user={user} car={car} displayDialog={displayDialog} setDisplayDialog={setDisplayDialog} />
                <Dialog header={"ข้อมูลผู้ขาย"} visible={showProfile} style={{ width: '600px', maxWidth: "90%" }} onHide={() => setShowProfile(false)}>
                    <div className={style['seller-image-container']}>
                        <img src={`data:image/jpeg;base64,${user?.image}`}></img>
                    </div>
                    <div className={style['seller-dialog']}>
                        <label>ชื่อ</label>
                        <InputText value={user?.name} disabled />
                    </div>
                    <div className={style['seller-dialog']}>
                        <label>เบอร์โทร</label>
                        <InputText value={user?.phoneNumber} disabled />
                    </div>
                    <div className={style['seller-dialog']}>
                        <label>ที่อยู่</label>
                        <InputTextarea id={style["seller-text-area"]} value={user?.phoneNumber} disabled />
                    </div>
                </Dialog>
                <Dialog header="ยืนยันการแบน ?" visible={displayDialogBan} style={{ width: '400px' }} footer={renderFooterBan()} onHide={() => setDisplayDialogBan(false)}>
                </Dialog>
                <Dialog header="ยืนยันการปลดแบน ?" visible={displayDialogUnban} style={{ width: '400px' }} footer={renderFooterUnban()} onHide={() => setDisplayDialogUnban(false)}>
                </Dialog>
                <div className={style['detail-page-container']}>
                    <div className={style['detail-box']}>
                        <div className={style['seller-profile']}>
                            {sessionStorage.getItem("role") === "admin" ? user?.status === 1 ? <Button disabled style={{ background: "rgb(50, 205, 50)", display: "flex", justifyContent: "center", border: "none", width: "25%", minWidth: "130px" }} >สถานะ:ปกติ</Button> :
                                <Button disabled style={{ background: "red", display: "flex", justifyContent: "center", border: "none", width: "25%", minWidth: "130px" }} >สถานะ:ระงับ</Button> : <Button disabled={Number(sessionStorage.getItem("userId")) === user?.userId} style={{ background: "rgb(50, 205, 50)", display: "flex", justifyContent: "center", border: "none", width: "25%", minWidth: "130px" }} onClick={(event) => setDisplayDialog(true)} aria-haspopup aria-controls="overlay_tmenu">
                                ติดต่อผู้ขาย
                            </Button>}
                            <div className={style['seller-profile-detail']}>
                                <Button id={style["profile"]} onClick={(e) => setShowProfile(true)}>
                                    <div className={style["profile-img-box"]}>
                                        <img src={`data:image/jpeg;base64,${user?.image}`}></img>
                                    </div>
                                    <label>{user?.name}</label>
                                </Button>
                                {sessionStorage.getItem("role") === "admin" ? car.carStatus === 1 ? <i className="pi pi-ban" onClick={() => setDisplayDialogBan(true)} id={style["ban"]}></i> : <i className="pi pi-lock-open" onClick={() => setDisplayDialogUnban(true)} id={style["ban"]}></i> : user?.userId === Number(sessionStorage.getItem("userId")) ? <Link href={'/edit-car-detail/' + car.carId} key={car.carId}>
                                    <i className="pi pi-pencil"></i>
                                </Link> : null}
                            </div>
                        </div>
                        <div style={{ border: "2px solid #FEFEFE", boxShadow: "5px 5px 5px rgb(0,0,0,0.32)", marginBottom: "8px", background: "#FEFEFE", padding: "4px 16px", borderBottomLeftRadius: "25px", borderTopRightRadius: "25px", borderTopLeftRadius: "5px", borderBottomRightRadius: "5px" }}>
                            <h3 style={{ margin: "0", color: "rgb(65, 65, 65)" }}>{car?.carHeader}</h3>
                        </div>
                        {car?.carCondition === "มือสอง" ? <div className={style["image-button-condition"]}>
                            <Button type="button" onClick={() => setIsDefect(false)} aria-haspopup aria-controls="overlay_tmenu">
                                รูปรถ
                            </Button>
                            <Button type="button" onClick={() => setIsDefect(true)} aria-haspopup aria-controls="overlay_tmenu">
                                ตำหนิ
                            </Button>
                        </div> : null}
                        <div className={style['card-images']}>
                            {isDefect && !imgDefect ? <h2 style={{ color: "#FEFEFE" }}>ไม่มีรูปภาพตำหนิ</h2> : <Galleria value={isDefect ? imgDefect : img} numVisible={5} circular style={{ maxWidth: '640px' }}
                                showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />}

                        </div>
                    </div>
                </div>
                <DetailCarContainer carDetail={car!} />
                {car && sessionStorage.getItem("role") !== "admin" ? <><CarCalculate carDetail={car!} /></> : null}
                {car && sessionStorage.getItem("role") !== "admin" ?
                    <>
                        <div className={style['car-rec-container']}>
                            {recLevel.map((e) => {
                                return recomendLevel(e)
                            })}
                        </div></> : null}
            </div >
        )
    }

}
export default Details