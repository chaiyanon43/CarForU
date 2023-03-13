import style from '../../src/styles/SellCar.module.css'
import { FileUpload } from 'primereact/fileupload';
import { useState, useEffect, ChangeEvent } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SellForm } from 'components/interfaces';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { CarService } from 'services/CarService';
import { toaster } from "evergreen-ui";
import axios from '../../axios.config';
import Router from 'next/router'



const SellCarPanel = () => {
    const [files, setFiles] = useState<File[]>();
    const [realFiles, setRealFiles] = useState([])
    const [files2, setFiles2] = useState<File[]>();
    const [brands, setBrands] = useState();
    const [models, setModels] = useState();
    const carService = new CarService();
    const getBrandList = () => {
        const response = carService.getBrandList();
        response.then((res) => {
            setBrands!(res)
        })
    }
    
    useEffect(() => {
        getBrandList()
    }, [])

    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<SellForm>({
        defaultValues: {
            carCondition: "มือหนึ่ง",
            carBrand: ""
        }
    });
    const condition = ["มือหนึ่ง", "มือสอง"];
    const fuelType = ["เบนซิน", "ดีเซล", "ไฮบริด", `EV`];
    const gears = ["Auto", "Manual"];
    const seats = [2, 4, 5, 7];
    const year = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    const gas = ["ไม่ติดตั้ง", "ติดตั้ง"]
    const onUpload: SubmitHandler<SellForm> = (carForm) => {
        carForm.carImage = files!;
        carForm.carImageDefect = files2!
        carForm.carId = '7'
        if (carForm.carFuelType !== 'EV') {
            carForm.carEVRange = 0;
        } else {
            carForm.carFuelConsumption = 0;
        }
        if (carForm.carCondition === 'มือหนึ่ง') {
            carForm.carMileage = 0;
            carForm.carGas = false
        } else {
            if (carForm.carGas === 'ไม่ติดตั้ง') {
                carForm.carGas = false;
            } else if (carForm.carGas === 'ติดตั้ง') {
                carForm.carGas = true;
            }

        }
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('carId', '7');
        files!.forEach(e => {
            data.append('carImage', e)
        });
        if(files2){
            files!.forEach(e => {
                data.append('carImageDefect', e)
            });
        }
        data.append('carAddress',carForm.carAddress)
        data.append('carBrand',carForm.carBrand)
        data.append('carColor',carForm.carColor)
        data.append('carCondition',carForm.carCondition)
        data.append('carDesc',carForm.carDesc)
        data.append('carEVRange',carForm.carEVRange)
        data.append('carFuelConsumption',carForm.carFuelConsumption)
        data.append('carFuelType',carForm.carFuelType)
        data.append('carGas',carForm.carGas)
        data.append('carGearType',carForm.carGearType)
        data.append('carHorsePower',carForm.carHorsePower)
        data.append('carMileage',carForm.carMileage)
        data.append('carModel',carForm.carModel)
        data.append('carPrice',carForm.carPrice)
        data.append('carSeats',carForm.carSeats)
        data.append('carYear',carForm.carYear)
        data.append('carHeader',carForm.carHeader)

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/add-car',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        };

        axios(config)
        .then(function (response) {
          toaster.success("Car added.",{
            description:response.data
          })
          Router.reload(window.location.pathname)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const onUploadFiles = async (e: any) => {
        setFiles(e.files)
    }
    const onUploadFiles2 = async (e: any) => {
        setFiles2(e.files)
    }
    const onRemoveFile = async (file: any) => {
        setFiles(files!.filter((temp) => temp.name !== file.file.name))
    }
    const onRemoveFile2 = async (file: any) => {
        setFiles2(files2!.filter((temp) => temp.name !== file.file.name))
    }
    const onBrandChange = (e: any) => {
        setValue('carBrand', e.value)
        const response = carService.getModelList(e.value)
        response.then((res) => {
            setModels!(res)
        })
    }

    return (
        <div className={style['sell-main-container']}>
            <form onSubmit={handleSubmit(onUpload)} encType='multipart/form-data'>
                <h3>ขายรถยนต์</h3>
                <div className={style['sell-box']}>
                    <h3>หัวข้อ</h3>
                    <InputText {...register('carHeader')} />
                </div>
                <div className={style['sell-box']}>
                    <h3>รูปภาพ</h3>
                    <FileUpload multiple customUpload uploadHandler={onUploadFiles} onRemove={onRemoveFile} auto />
                </div>
                {watch('carCondition') === "มือสอง" ? <div className={style['sell-box']}>
                    <h3>รูปภาพตำหนิ</h3>
                    <FileUpload multiple customUpload uploadHandler={onUploadFiles2} onRemove={onRemoveFile2} auto />
                </div> : null}
                <div className={style['sell-box']}>
                    <h3>รถยนต์ มือหนึ่ง/มือสอง </h3>
                    <SelectButton options={condition} value={watch('carCondition')} {...register("carCondition", { required: true })} />
                    {errors.carCondition && <span>กรุณาระบุ</span>}
                </div>
                <div className={style['sell-box']}>
                    <h3>เชื้อเพลิง</h3>
                    <SelectButton options={fuelType} value={watch('carFuelType')} {...register("carFuelType", { required: true })} />
                    {errors.carFuelType && <span>กรุณาระบุ</span>}
                </div>
                <div className={style['sell-box']}>
                    <h3>ยี่ห้อ</h3>
                    <Dropdown className={style['dropdown']} options={brands} placeholder="ระบุยี่ห้อ" value={watch('carBrand')} onChange={onBrandChange} />
                </div>
                <div className={style['sell-box']}>
                    <h3>รุ่น</h3>
                    <Dropdown className={style['dropdown']} disabled={!watch('carBrand')} options={models} placeholder="ระบุรุ่น" value={watch('carModel')} {...register("carModel")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>สี</h3>
                    <InputText {...register('carColor')} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ระบบเกียร์</h3>
                    <SelectButton options={gears} value={watch('carGearType')} {...register("carGearType")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>แรงม้า</h3>
                    <InputNumber onValueChange={(e) => setValue('carHorsePower', e.value!)} required />
                </div>
                <div className={style['sell-box']}>
                    <h3>เลขไมล์ (กิโลเมตร)</h3>
                    <InputNumber onValueChange={(e) => setValue('carMileage', e.value!)} disabled={(watch('carCondition') === "มือหนึ่ง" || watch('carCondition') === null) ? true : false} required={watch('carCondition') === "EV" ? false : true} />
                </div>
                <div className={style['sell-box']}>
                    <h3>จำนวนที่นั่ง</h3>
                    <SelectButton options={seats} value={watch('carSeats')} {...register("carSeats")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>อัตราสิ้นเปลือง (กิโลเมตร/ลิตร)</h3>
                    <InputNumber mode="decimal" minFractionDigits={0} maxFractionDigits={2} onValueChange={(e) => setValue('carFuelConsumption', e.value!)} disabled={watch('carFuelType') === "EV" ? true : false} required={watch('carFuelType') === "EV" ? false : true} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ปี</h3>
                    <Dropdown className={style['dropdown']} options={year} placeholder="ระบุปีรถยนต์" value={watch('carYear')} {...register("carYear")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ระยะทาง(กิโลเมตร)/ชาร์จ 1 ครั้ง</h3>
                    <InputNumber onValueChange={(e) => setValue('carEVRange', e.value!)} disabled={watch('carFuelType') === "EV" ? false : true} required={watch('carFuelType') === "EV" ? true : false} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ติดตั้งระบบแก๊ส</h3>
                    <SelectButton options={gas} value={watch('carGas')} {...register("carGas")} disabled={watch('carCondition') === "มือหนึ่ง" ? true : false} required={watch('carCondition') === "EV" ? false : true} />
                </div>
                <div className={style['sell-box']}>
                    <h3>รายละเอียดเพิ่มเติม</h3>
                    <InputTextarea {...register("carDesc")} rows={5} cols={30} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ที่อยู่</h3>
                    <InputTextarea {...register("carAddress")} rows={5} cols={30} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ราคา</h3>
                    <InputNumber onValueChange={(e) => setValue('carPrice', e.value!)} required />
                </div>
                <div className={style['sell-box']}>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </div >
    )
}
export default SellCarPanel