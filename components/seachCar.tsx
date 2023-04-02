import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import style from '../src/styles/Filter.module.css'
import { RadioButton } from 'primereact/radiobutton';
import { BuyCar } from './BuyCar/buy_new_car';
import { TreeSelect } from 'primereact/treeselect';
import { CommonFunc } from './commonFunc';
import { CarService } from 'services/CarService';
import { AllBrandsAndModels, itemsMultipleDropDown, models } from './interfaces';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { toaster } from 'evergreen-ui';
export interface filterForm {
    brandModel: [],
    carPrice: [100000, 5000000],
    carYear: [1960, 2023],
    fuelType: string,
    seats: any[],
    gear: any[],
    mileage: string,
    keyword: string,
    brandsName: string[],
    modelsName: string[]
}
const SearchCar = (props: BuyCar) => {
    const { isSecond, isSearch, setData } = props;
    const { register, watch, handleSubmit, getValues, reset, setValue, formState: { errors } } = useForm<filterForm>({
        defaultValues: {
            carPrice: [100000, 5000000],
            carYear: [1960, 2023],
            fuelType: "",
            seats: [],
            gear: [],
        }
    });
    const [range, setRange] = useState<[number, number]>([100000, 5000000])
    const [year, setYear] = useState<[number, number]>([1960, 2023])
    const [seats, setSeats] = useState<any>([]);
    const [gears, setGears] = useState<any>([]);
    const [brandModel, setBeandModel] = useState<any[]>([])
    const commonFunc = new CommonFunc();
    const [brandToSend, setBrandToSend] = useState<string>('')
    const [modelToSend, setModelToSend] = useState<string>('')

    const carService = new CarService();
    const [brandsModels, setBrandsModels] = useState<itemsMultipleDropDown[]>([])
    const [brands, setBrands] = useState<string[]>([])
    const [models, setModels] = useState<string[]>([])
    useEffect(() => {
        getBrandsModels();
    }, [])
    const getBrandsModels = () => {
        const response = carService.getAllBrandsAndModels()

        response.then((res) => {
            setBrandsModels(res)

        })
    }
    const onSeatChange = (e: any) => {
        let selectedSeats = [...seats];

        if (e.checked)
            selectedSeats.push(e.value);
        else
            selectedSeats.splice(selectedSeats.indexOf(e.value), 1);

        setValue("seats", selectedSeats);
    }
    const onGearChange = (e: any) => {
        let selectedGears = [...gears];

        if (e.checked)
            selectedGears.push(e.value);
        else
            selectedGears.splice(selectedGears.indexOf(e.value), 1);

        setValue("gear", selectedGears);
    }
    const onFilter: SubmitHandler<filterForm> = (filter: any) => {
        const status = sessionStorage.getItem("role") === "admin" ? 2:1
    
        if (!isSecond) {
            const axios = require('axios');
            const FormData = require('form-data');
            let data = new FormData();
            data.append('searchKeyword', filter.keyword ? filter.keyword: '')
            data.append('carPrice', `${filter.carPrice[0]},${filter.carPrice[1]}`);
            data.append('carYear', `${filter.carYear[0]},${filter.carYear[1]}`);
            data.append('carFuelType', filter.fuelType);
            data.append('carSeats', filter.seats[0] ? filter.seats[0] : 0);
            data.append('carGear', filter.gear[0] ? filter.gear[0] : '');
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
                    setData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const axios = require('axios');
            const FormData = require('form-data');
            let data = new FormData();
            console.log(filter.keyword)
            data.append('searchKeyword', filter.keyword ? filter.keyword: '')
            data.append('carPrice', `${filter.carPrice[0]},${filter.carPrice[1]}`);
            data.append('carYear', `${filter.carYear[0]},${filter.carYear[1]}`);
            data.append('carFuelType', filter.fuelType);
            data.append('carSeats', filter.seats[0] ? filter.seats[0] : 0);
            data.append('carGear', filter.gear[0] ? filter.gear[0] : '');
            data.append('carMileage', filter.mileage ? filter.mileage : 70001)
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
                    setData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    const onNodedSelect = (e) => {
        if (e.node.children) {
            brands.push(e.node.data)
        } else {
            models.push(e.node.data)
        }
    }
    const onReset = (e) => {
        reset()
        setBrands([])
        setModels([])
    }

    const onNodeUnselect = (e) => {
        if (e.node.children) {
            setBrands(brands.filter((brand) => brand !== e.node.data))
        } else {
            setModels(models.filter((model) => model !== e.node.data))
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onFilter)} encType='multipart/form-data' onReset={onReset}>
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword" value={watch("keyword")} onChange={(e) => setValue("keyword", e.target.value)} />
                    <Button type='submit' icon="pi pi-search" className="p-button-warning" />
                </div>

                {isSearch &&
                    <>
                        <div className={style['filter-container']}>
                            <div className={style['filter-box']}>
                                <h3>ยี่ห้อ - รุ่น</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['brand-model']}>
                                        <TreeSelect className="md:w-20rem w-full" id={style["input-brand"]} value={watch("brandModel")} options={brandsModels} display="chip" selectionMode="checkbox" onNodeSelect={onNodedSelect} onNodeUnselect={onNodeUnselect} onChange={(e) => {
                                            setValue('brandModel', e.value)
                                        }
                                        } placeholder="Select Items">
                                        </TreeSelect>
                                    </div>
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>ราคา</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['header-slider']}>
                                        <label>{watch('carPrice.0') && commonFunc.numberWithCommas(watch('carPrice.0'))}</label>
                                        <label>{watch('carPrice.1') && commonFunc.numberWithCommas(watch('carPrice.1'))}</label>
                                    </div>
                                    <Slider value={watch('carPrice')} onChange={(e: any) => setValue("carPrice", e.value)} min={100000} max={5000000} step={200000} range />
                                </div>
                            </div>

                            <div className={style['filter-box']}>
                                <h3>ปี</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['header-slider']}>
                                        <label>{watch('carYear.0')}</label>
                                        <label>{watch('carYear.1')}</label>
                                    </div>
                                    <Slider value={watch('carYear')} onChange={(e: any) => setValue("carYear", e.value)} min={1960} max={2023} step={1} range />
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>เชื้อเพลิง</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['fuel-container']}>
                                        <Button type="button" label="เบนซิน" onClick={(e) => setValue("fuelType", "เบนซิน")} style={watch("fuelType") === "เบนซิน" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="ดีเซล" onClick={(e) => setValue("fuelType", "ดีเซล")} style={watch("fuelType") === "ดีเซล" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="ไฮบริด" onClick={(e) => setValue("fuelType", "ไฮบริด")} style={watch("fuelType") === "ไฮบริด" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="EV" onClick={(e) => setValue("fuelType", "EV")} style={watch("fuelType") === "EV" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                    </div>
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>ที่นั่ง</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['seat-selected']}>
                                        <div className="field-checkbox">
                                            <Checkbox value="2" onChange={onSeatChange} checked={watch('seats').indexOf("2") !== -1} />
                                            <label>2</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox value="4" onChange={onSeatChange} checked={watch('seats').indexOf("4") !== -1} />
                                            <label>4</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox value="5" onChange={onSeatChange} checked={watch('seats').indexOf("5") !== -1} />
                                            <label>5</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox value="7" onChange={onSeatChange} checked={watch('seats').indexOf("7") !== -1} />
                                            <label>7</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>ระบบเกียร์</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['gear-selected']}>
                                        <div className="field-checkbox">
                                            <Checkbox value="Auto" onChange={onGearChange} checked={watch('gear').indexOf('Auto') !== -1} />
                                            <label>Auto</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox value="Manual" onChange={onGearChange} checked={watch('gear').indexOf('Manual') !== -1} />
                                            <label>Manual</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isSecond && <div className={style['filter-box']}>
                                <h3>เลขไมล์</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['gear-selected']}>
                                        <div className={style['radio-btn']}>
                                            <RadioButton value="20000" onChange={(e) => setValue("mileage", e.value)} checked={watch("mileage") === '20000'} />
                                            <label>น้อยกว่า 20,000</label>
                                        </div>
                                        <div className={style['radio-btn']}>
                                            <RadioButton value="40000" onChange={(e) => setValue("mileage", e.value)} checked={watch("mileage") === '40000'} />
                                            <label>น้อยกว่า 40,000</label>
                                        </div>
                                        <div className={style['radio-btn']}>
                                            <RadioButton value="70000" onChange={(e) => setValue("mileage", e.value)} checked={watch("mileage") === '70000'} />
                                            <label>น้อยกว่า 70,000</label>
                                        </div>
                                        <div className={style['radio-btn']}>
                                            <RadioButton value="70002" onChange={(e) => setValue("mileage", e.value)} checked={watch("mileage") === '70002'} />
                                            <label>มากกว่า 70,000</label>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={style["button-search-form"]}>
                            <Button type="reset" id={style["reset"]}>รีเซ็ต</Button>
                            <Button type="submit">ค้นหา</Button>
                        </div></>}
            </form>
        </div>
    )
}
export default SearchCar