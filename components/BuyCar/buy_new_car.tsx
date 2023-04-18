import SearchCar, { filterForm } from "components/seachCar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from '../../src/styles/NewCar.module.css'
import { CommonFunc } from "components/commonFunc";
import { carCard, CarData } from "components/interfaces";
import { CarService } from "services/CarService";
import CarCard from "components/carCard";
import { toaster } from "evergreen-ui/types";
import { Paginator } from "primereact/paginator";
import Image from "next/image";
import sorry from "../../images/sorry.png"
export interface BuyCar {
    isSecond?: boolean;
    isSearch?: boolean;
    setData?: Dispatch<SetStateAction<CarData>>;
    setSortBy?: Dispatch<SetStateAction<string>>;
    sortBy?: string;
    brands?: string[];
    models?: string[];
    setBrands?: Dispatch<SetStateAction<string[]>>;
    setModels?: Dispatch<SetStateAction<string[]>>;
    getAllData?: any;
}
const BuyNewCar = (props: BuyCar) => {
    const { isSecond, isSearch } = props
    const commonFunc = new CommonFunc();
    const [searchDetail, setSearchDetail] = useState<boolean>(false)
    const [arrow, setArrow] = useState<string>("pi pi-angle-down")
    const [data, setData] = useState<carCard[]>([])
    const [dataPaginator, setDataPaginator] = useState<carCard[]>([])
    const [sortBy, setSortBy] = useState('priceMin')
    const [favCarId, setFavCarId] = useState<number[]>([])
    const [brands, setBrands] = useState<string[]>([])
    const [models, setModels] = useState<string[]>([])
    const [notFound, setNotFound] = useState<boolean>(false)
    const carService = new CarService
    const getAllData = (filter: filterForm, sortBy: string) => {
        const status = sessionStorage.getItem("role") === "admin" ? 2 : 1
        setNotFound(false)
        if (!isSecond) {
            const axios = require('axios');
            const FormData = require('form-data');
            let data = new FormData();
            data.append('searchKeyword', filter.keyword ? filter.keyword : '')
            data.append('carPrice', `${filter.carPrice[0]},${filter.carPrice[1]}`);
            data.append('carYear', `${filter.carYear[0]},${filter.carYear[1]}`);
            data.append('carFuelType', filter.fuelType);
            data.append('carSeats', filter.seats ? filter.seats : 0);
            data.append('carGear', filter.gear ? filter.gear : '');
            data.append('status', status);

            brands.map((e) => {
                data.append(`carBrands`, e)
            })
            models.map((e) => {
                data.append(`carModels`, e)
            })
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/all-first-hand-car-search',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.length === 0) {
                        setNotFound(true)
                    }
                    if (sortBy === "priceMin") {
                        setData(response.data.sort((a, b) => a.carPrice - b.carPrice))
                    } else if (sortBy === "priceMax") {
                        setData(response.data.sort((a, b) => b.carPrice - a.carPrice))
                    } else if (sortBy === "yearMin") {
                        setData(response.data.sort((a, b) => a.carYear - b.carYear))
                    }
                    else if (sortBy === "yearMax") {
                        setData(response.data.sort((a, b) => b.carYear - a.carYear))
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const axios = require('axios');
            const FormData = require('form-data');
            let data = new FormData();
            console.log(filter.keyword)
            data.append('searchKeyword', filter.keyword ? filter.keyword : '')
            data.append('carPrice', `${filter.carPrice[0]},${filter.carPrice[1]}`);
            data.append('carYear', `${filter.carYear[0]},${filter.carYear[1]}`);
            data.append('carFuelType', filter.fuelType);
            data.append('carSeats', filter.seats ? filter.seats : 0);
            data.append('carGear', filter.gear ? filter.gear : '');
            data.append('carMileage', `${filter.carMileage[0]},${filter.carMileage[1]}`)
            data.append('status', status);
            brands.map((e) => {
                data.append(`carBrands`, e)
            })
            models.map((e) => {
                data.append(`carModels`, e)
            })
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/all-second-hand-car-search',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.length === 0) {
                        setNotFound(true)
                    }
                    if (sortBy === "priceMin") {
                        setData(response.data.sort((a, b) => a.carPrice - b.carPrice))
                        setDataPaginator(response.data.sort((a, b) => a.carPrice - b.carPrice).slice(0, 10))

                    } else if (sortBy === "priceMax") {
                        setData(response.data.sort((a, b) => b.carPrice - a.carPrice))
                        setDataPaginator(response.data.sort((a, b) => b.carPrice - a.carPrice).slice(0, 10))
                    } else if (sortBy === "yearMin") {
                        setData(response.data.sort((a, b) => a.carYear - b.carYear))
                        setDataPaginator(response.data.sort((a, b) => a.carYear - b.carYear).slice(0, 10))
                    }
                    else if (sortBy === "yearMax") {
                        setData(response.data.sort((a, b) => b.carYear - a.carYear))
                        setDataPaginator(response.data.sort((a, b) => b.carYear - a.carYear).slice(0, 10))
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getFavId()
    }
    const getFavId = () => {
        const responseFav = carService.getFavoriteCarsId(sessionStorage.getItem('user')!)
        responseFav.then((res) => {
            setFavCarId(res)
        })
    }
    const defaultValues = {
        carPrice: [100000, 10000000],
        carYear: !isSecond ? [2020, 2023] : [1960, 2023],
        carMileage: [0, 1000000],
        fuelType: "",
        seats: "",
        gear: "",
    }
    useEffect(() => {
        if (!sessionStorage.getItem('role')) return
        else {
            getAllData(defaultValues, 'priceMin')
        }

    }, [])
    const goToDetail = () => {
        window.location.href = "/car-detail"
    }
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);
    const onBasicPageChange = (event) => {
        window.scrollTo(0, 0)
        setBasicFirst(event.first);
        setBasicRows(event.rows);
        setDataPaginator(data.slice(event.first, event.rows))
    }
    return (
        <>
            <div className={style["main-container"]}>
                <div className={style["search-box"]} style={{ height: `${searchDetail ? 'auto' : ''}` }}>
                    <SearchCar isSecond={isSecond} isSearch={searchDetail} setData={setData} sortBy={sortBy}
                        getAllData={getAllData}
                        setBrands={setBrands}
                        setModels={setModels}
                        brands={brands}
                        models={models}
                        setSortBy={setSortBy} />
                    <div className={style['arrow-search']}>
                        <i onClick={() => {
                            setSearchDetail(!searchDetail)
                            setArrow(searchDetail ? "pi pi-angle-down" : "pi pi-angle-up")
                        }} className={arrow} style={{ 'fontSize': '24px' }}></i>
                    </div>
                </div>
                {!notFound && data.length === 0 ? <>loading...</>:null}
                <div className={style["card-container"]}>
                    {data ? data.slice(basicFirst, basicFirst + 10).map((e, index) => {
                        return (
                            <>
                                <CarCard carDetail={e} carFavId={favCarId} getFavId={getFavId} isSecond={isSecond} setCarDetails={setData} />
                            </>
                        )
                    }) : null
                    }
                </div>
                {notFound ?
                    <div className={style['apologize-container']}>
                        <div className={style['img-container']}>
                            <Image
                                id="icon"
                                src={sorry}
                                alt="sorry"
                            />
                        </div>
                        <label>ขออภัย ไม่พบผลลัพท์ในการค้นหา</label>
                        <label>ต้องการ <span id={style['reset']} onClick={(e)=>getAllData(defaultValues, 'priceMin')}>ดูรถยนต์ทั้งหมด</span> หรือไม่?</label>
                    </div> : null}
                <Paginator first={basicFirst} rows={basicRows} totalRecords={data.length} onPageChange={onBasicPageChange}></Paginator>
            </div>
        </>
    );
}
export default BuyNewCar