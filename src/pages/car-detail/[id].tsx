import { CommonFunc } from "components/commonFunc";
import { CarData, itemImage, RecCarList } from "components/interfaces";
import { useRouter } from "next/router"
import { Galleria } from 'primereact/galleria';
import { parse } from "querystring";
import { useEffect, useState } from "react";
import { CarService } from "services/CarService";
import style from '../../styles/DetailPage.module.css'

const Details = () => {
    const carService = new CarService();
    const router = useRouter();
    const { id } = router.query
    const [carId, setCarId] = useState<string | string[]>();
    const [car, setCar] = useState<CarData>();
    const [carRec, setCarRec] = useState<RecCarList>();
    const [img, setImg] = useState<itemImage[]>([]);
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
    useEffect(() => {
        if (!router.isReady) return;
        if (id) {
            getCarDetail(id)
            setCarId(id)
        }
    }, [router.query.id, router.isReady]);
    const getCarDetail = (carId: string | string[]) => {
        const response = carService.getCarDetail(carId)

        response.then((res) => {
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
        })
    }

    const itemTemplate = (item: itemImage) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item: itemImage) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }
    const images = [
        {
            itemImageSrc: "https://img.icarcdn.com/autospinn/body/000000156268_f97d5e35_dca6_4ed4_8e5a_225038915280.jpeg",
            thumbnailImageSrc: "https://img.icarcdn.com/autospinn/body/000000156268_f97d5e35_dca6_4ed4_8e5a_225038915280.jpeg",
            alt: "Description for Image 1",
            title: "Title 1"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },

    ]
    const commonFunc = new CommonFunc();
    return (
        <div>
            <div className={style['detail-page-container']}>
                <div className={style['detail-box']}>
                    <h3>{car?.carHeader}</h3>
                    <div className={style['card-images']}>
                        <Galleria value={img} numVisible={5} circular style={{ maxWidth: '640px' }}
                            showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
                    </div>
                </div>
            </div>
            <div className={style['car-rec-container']}>
            <h3>NORMAL</h3>
                <div className={style['car-rec-box']}>
                    {carRec?.normalCar.map((carNm) => {
                        return (
                            <div className={style['car-rec-inside']} key={carNm.carId}>
                                <div className={style['car-rec-image-container']}>
                                    <img src={`data:image/jpeg;base64,${carNm.carImage}`} />
                                </div>
                                <div className={style['car-rec-text']}>
                                    <label id={style['header']}>{carNm.carHeader}</label>
                                    <label>{commonFunc.numberWithCommas(carNm.carPrice)}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <h3>HYBRID</h3>
                <div className={style['car-rec-box']}>
                    {carRec?.hybridCar.map((carHb) => {
                        return (
                            <div className={style['car-rec-inside']} key={carHb.carId}>
                                <div className={style['car-rec-image-container']}>
                                    <img src={`data:image/jpeg;base64,${carHb.carImage}`} />
                                </div>
                                <div className={style['car-rec-text']}>
                                    <label id={style['header']}>{carHb.carHeader}</label>
                                    <label>฿{commonFunc.numberWithCommas(carHb.carPrice)}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <h3>EV</h3>
                <div className={style['car-rec-box']}>
                    {carRec?.evcar.map((carEv) => {
                        return (
                            <div className={style['car-rec-inside']} key={carEv.carId}>
                                <div className={style['car-rec-image-container']}>
                                    <img src={`data:image/jpeg;base64,${carEv.carImage}`} />
                                </div>
                                <div className={style['car-rec-text']}>
                                    <label id={style['header']}>{carEv.carHeader}</label>
                                    <label>{commonFunc.numberWithCommas(carEv.carPrice)}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
export default Details