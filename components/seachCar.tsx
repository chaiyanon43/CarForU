import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
export interface filterForm {
    brandModel: [],
    carPrice: [100000, 10000000],
    carYear: [1960, 2023] | [2020, 2023],
    fuelType: string,
    seats: any,
    gear: any,
    carMileage: [0, 1000000],
    keyword: string,
    brandsName: string[],
    modelsName: string[],
}
const SearchCar = (props: BuyCar) => {
    const { isSecond, isSearch, setData, setSortBy, sortBy, setBrands, setModels, brands, models, getAllData } = props;
    const { register, watch, handleSubmit, getValues, resetField, reset, setValue, formState: { errors } } = useForm<filterForm>({
        defaultValues: {
            carPrice: [100000, 10000000],
            carYear: !isSecond ? [2020, 2023] : [1960, 2023],
            carMileage: [0, 1000000],
            fuelType: "",
            seats: "",
            gear: "",
        }
    });

    const commonFunc = new CommonFunc();
    const carService = new CarService();
    const [brandsModels, setBrandsModels] = useState<itemsMultipleDropDown[]>([])

    useEffect(() => {
        getBrandsModels();
    }, [])
    const getBrandsModels = () => {
        const response = carService.getAllBrandsAndModels()

        response.then((res) => {
            setBrandsModels(res)

        })
    }
    const onFilter: SubmitHandler<filterForm> = async (filter: any) => {
        getAllData(filter, sortBy)
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
        onFilter(getValues())
    }

    const onNodeUnselect = (e) => {
        if (e.node.children) {
            setBrands(brands.filter((brand) => brand !== e.node.data))
        } else {
            setModels(models.filter((model) => model !== e.node.data))
        }
    }
    const onSortPrice = async (e) => {
        setSortBy(e.value)
        // onFilter(getValues())
    }
    const onSortYear = async (e) => {
        setSortBy(e.value)
        // onFilter(getValues())
    }
    useEffect(() => {
        onFilter(getValues())
    }, [sortBy, setSortBy])
    const sortOptions = [
        { label: 'ราคาต่ำไปสูง', value: 'priceMin' },
        { label: 'ราคาสูงไปต่ำ', value: 'priceMax' },
        { label: 'ปีต่ำไปสูง', value: 'yearMin' },
        { label: 'ปีสูงไปต่ำ', value: 'yearMax' }
    ];
    return (
        <div>
            <form onSubmit={handleSubmit(onFilter)} encType='multipart/form-data' onReset={onReset}>
                <div className={style["sort-by"]}>
                    <h3>เรียงตาม : </h3>
                    <Dropdown id={style['dropdown-sort']} value={sortBy} options={sortOptions} onChange={(e) => setSortBy(e.value)} />
                </div>
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
                                        <InputNumber value={watch('carPrice.0')} min={100000} max={watch("carPrice.1") - 50000} onValueChange={(e) => {
                                            setValue("carPrice.0", e.value)
                                        }
                                        } />
                                        <InputNumber value={watch('carPrice.1')} min={watch("carPrice.0") + 50000} max={10000000} onValueChange={(e) => setValue("carPrice.1", e.target.value)} />

                                        {/* <label>{watch('carPrice.0') && commonFunc.numberWithCommas(watch('carPrice.0'))}</label>
                                        <label>{watch('carPrice.1') && commonFunc.numberWithCommas(watch('carPrice.1'))}</label> */}
                                    </div>
                                    <Slider value={watch('carPrice')} onChange={(e: any) => setValue("carPrice", e.value)} min={100000} max={10000000} step={50000} range />
                                </div>
                            </div>

                            <div className={style['filter-box']}>
                                <h3>ปี</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['header-slider']}>
                                        <InputNumber useGrouping={false} value={watch('carYear.0')} min={isSecond ? 1960:2020} max={watch("carYear.1") - 1} onValueChange={(e) => {
                                            setValue("carYear.0", e.value)
                                        }
                                        } />
                                        <InputNumber useGrouping={false} value={watch('carYear.1')} min={watch("carYear.0") + 1} max={2023} onValueChange={(e) => setValue("carYear.1", e.target.value)} />
                                    </div>
                                    <Slider value={watch('carYear')} onChange={(e: any) => setValue("carYear", e.value)} min={!isSecond ? 2020 : 1960} max={2023} step={1} range />
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>เชื้อเพลิง</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['fuel-container']}>
                                        <Button type="button" label="เบนซิน" onClick={(e) => {
                                            setValue("fuelType", "เบนซิน")
                                        }} style={watch("fuelType") === "เบนซิน" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="ดีเซล" onClick={(e) => {
                                            setValue("fuelType", "ดีเซล")
                                        }} style={watch("fuelType") === "ดีเซล" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="ไฮบริด" onClick={(e) => {
                                            setValue("gear", "Auto")
                                            setValue("fuelType", "ไฮบริด")
                                        }} style={watch("fuelType") === "ไฮบริด" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                        <Button type="button" label="EV" onClick={(e) => {
                                            setValue("gear", "Auto")
                                            setValue("fuelType", "EV")
                                        }} style={watch("fuelType") === "EV" ? { background: "#6366F1", color: "#FFF" } : {}} />
                                    </div>
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>ที่นั่ง</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['seat-selected']}>
                                        <div className="field-checkbox" style={{ padding: "8px 0" }}>
                                            <RadioButton value={2} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 2} />
                                            <label>2</label>
                                        </div>
                                        <div className="field-checkbox" style={{ padding: "8px 0" }}>
                                            <RadioButton value={4} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 4} />
                                            <label>4</label>
                                        </div>
                                        <div className="field-checkbox" style={{ padding: "8px 0" }}>
                                            <RadioButton value={5} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 5} />
                                            <label>5</label>
                                        </div>
                                        <div className="field-checkbox" style={{ padding: "8px 0" }}>
                                            <RadioButton value={7} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 7} />
                                            <label>7</label>
                                        </div>
                                        <div className="field-checkbox" style={{ padding: "8px 0" }}>
                                            <RadioButton value={13} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 13} />
                                            <label>13</label>
                                        </div>
                                        <div className="field-checkbox">
                                            <RadioButton value={14} onChange={(e) => setValue("seats", e.value)} checked={watch('seats') === 14} />
                                            <label>13 ขึ้นไป</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style['filter-box']}>
                                <h3>ระบบเกียร์</h3>
                                <div className={style['filter-inside']}>
                                    <div className={style['gear-selected']}>
                                        <div className="field-checkbox">
                                            <RadioButton value="Auto" onChange={(e) => setValue("gear", e.value)} checked={watch('gear') === "Auto"} />
                                            <label>Auto</label>
                                        </div>
                                        {(watch('fuelType') !== "EV" && watch('fuelType') !== "ไฮบริด") && <div className="field-checkbox">
                                            <RadioButton value="Manual" onChange={(e) => setValue("gear", e.value)} checked={watch('gear') === "Manual"} />
                                            <label>Manual</label>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            {isSecond && <div className={style['filter-box']}>
                                <h3>เลขไมล์</h3>
                                <div className={style['filter-inside']}>

                                    <div className={style['header-slider']}>
                                        <InputNumber useGrouping={false} value={watch('carMileage.0')} min={0} max={watch("carMileage.1") - 5000} onValueChange={(e) => {
                                            setValue("carMileage.0", e.value)
                                        }
                                        } />
                                        <InputNumber value={watch('carMileage.1')} min={watch("carMileage.0") + 5000} max={1000000} onValueChange={(e) => setValue("carMileage.1", e.target.value)} />
                                    </div>
                                    <Slider value={watch('carMileage')} onChange={(e: any) => setValue("carMileage", e.value)} min={0} max={1000000} step={5000} range />
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