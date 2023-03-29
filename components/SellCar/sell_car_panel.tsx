import style from '../../src/styles/SellCar.module.css'
import { FileUpload } from 'primereact/fileupload';
import { useState, useEffect, ChangeEvent } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CarData, CarImage, SellForm } from 'components/interfaces';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { CarService } from 'services/CarService';
import { toaster } from "evergreen-ui";
import axios from '../../axios.config';
import Router from 'next/router'
import EditPanel from 'components/EditCar/EditPanel';
import Toaster from 'evergreen-ui/types/toaster/src/Toaster';

interface SellAndEditProps {
    carDetail?: CarData;
    isEdit?: boolean;
}

const SellCarPanel = (props: SellAndEditProps) => {
    const { carDetail, isEdit } = props;
    const [files, setFiles] = useState<File[]>();
    const [files2, setFiles2] = useState<File[]>();
    const [brands, setBrands] = useState();
    const [oldCarImage, setOldCarImage] = useState<CarImage[] | undefined>([])
    const [oldCarImageDefect, setOldCarImageDefect] = useState<CarImage[] | undefined>([])
    const [carImageIDDelete, setCarImageIDDelete] = useState<number[]>([])
    const [carImageIDDefectDelete, setCarImageIDDefectDelete] = useState<number[]>([])

    const [models, setModels] = useState();
    const carService = new CarService();
    const getBrandList = () => {
        const response = carService.getBrandList();
        response.then((res) => {
            setBrands!(res)
        })
    }


    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm<CarData>({
        defaultValues: {
            carHeader: carDetail?.carHeader,
            carCondition: carDetail?.carCondition,
            carFuelType: carDetail?.carFuelType,
            carBrand: carDetail?.carBrand,
            carModel: carDetail?.carModel,
            carColor: carDetail?.carColor,
            carGearType: carDetail?.carGearType,
            carHorsePower: carDetail?.carHorsePower,
            carMileage: carDetail?.carMileage,
            carSeats: carDetail?.carSeats,
            carFuelConsumption: carDetail?.carFuelConsumption,
            carYear: carDetail?.carYear,
            carEVRange: carDetail?.carEVRange,
            carGas: carDetail?.carGas ? "ติดตั้ง" : "ไม่ติดตั้ง",
            carDesc: carDetail?.carDesc,
            carAddress: carDetail?.carAddress,
            carPrice: carDetail?.carPrice
        }
    });
    const condition = ['มือหนึ่ง', 'มือสอง'];
    const fuelType = ["เบนซิน", "ดีเซล", "ไฮบริด", `EV`];
    const gears = ["Auto", "Manual"];
    const seats = [2, 4, 5, 7];
    const year = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    const gas = ["ไม่ติดตั้ง", "ติดตั้ง"]
    const onUpload: SubmitHandler<CarData> = (carForm) => {
        if (!isEdit) {
            if (!files) {
                toaster.warning("กรุณาเพิ่มรูปภาพรถยนต์", { duration: 3 })
                return
            }
            if (carForm.carCondition === "มือสอง" && !files2) {
                toaster.warning("กรุณาเพิ่มรูปภาพตำหนิ", { duration: 3 })
                return
            }
            carForm.carImage = files!;
            carForm.carImageDefect = files2!
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
            files!.forEach(e => {
                data.append('carImage', e)
            });
            if (files2) {
                files2!.forEach(e => {
                    data.append('carImageDefect', e)
                });
            }
            data.append('carAddress', carForm.carAddress)
            data.append('carBrand', carForm.carBrand)
            data.append('carColor', carForm.carColor)
            data.append('carCondition', carForm.carCondition)
            data.append('carDesc', carForm.carDesc)
            data.append('carEVRange', carForm.carEVRange)
            data.append('carFuelConsumption', carForm.carFuelConsumption)
            data.append('carFuelType', carForm.carFuelType)
            data.append('carGas', carForm.carGas)
            data.append('carGearType', carForm.carGearType)
            data.append('carHorsePower', carForm.carHorsePower)
            data.append('carMileage', carForm.carMileage)
            data.append('carModel', carForm.carModel)
            data.append('carPrice', carForm.carPrice)
            data.append('carSeats', carForm.carSeats)
            data.append('carYear', carForm.carYear)
            data.append('carHeader', carForm.carHeader)
            data.append('userId', sessionStorage.getItem('userId'))

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
                    toaster.success("ลงขายเสร็จสิ้น", {
                        description: response.data
                    })
                    reset()
                    setFiles(undefined)
                    setFiles2(undefined)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            var axios = require('axios');
            var FormData = require('form-data');
            var data = new FormData();
            carImageIDDelete.forEach(e => {
                data.append('carImageIDDelete', e)
            });
            if(carDetail?.carImages?.length === carImageIDDelete.length && !files){
                toaster.danger("กรุณาเพิ่มรูปภาพรถยนต์อย่างน้อย 1 รูป",{duration:3})
                return
            }
            if (files) {
                files!.forEach(e => {
                    data.append('carImage', e)
                });
            }
            if (carImageIDDelete){
                carImageIDDelete.forEach(e=> {
                   data.append('carImageIDDelete',e) 
                });
            }
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
                if(carDetail?.carImagesDefect?.length === carImageIDDefectDelete.length && !files2){
                    toaster.danger("กรุณาเพิ่มรูปภาพรถยนต์อย่างน้อย 1 รูป",{duration:3})
                    return
                }
                if (files2) {
                    files2!.forEach(e => {
                        data.append('carImageDefect', e)
                    });
                }
                if (carImageIDDefectDelete){
                    carImageIDDefectDelete.forEach(e=> {
                       data.append('carImageIDDelete',e) 
                    });
                }
                
            }
            data.append('carAddress', carForm.carAddress)
            data.append('carBrand', carForm.carBrand)
            data.append('carColor', carForm.carColor)
            data.append('carCondition', carForm.carCondition)
            data.append('carDesc', carForm.carDesc)
            data.append('carEVRange', carForm.carEVRange)
            data.append('carFuelConsumption', carForm.carFuelConsumption)
            data.append('carFuelType', carForm.carFuelType)
            data.append('carGas', carForm.carGas)
            data.append('carGearType', carForm.carGearType)
            data.append('carHorsePower', carForm.carHorsePower)
            data.append('carMileage', carForm.carMileage)
            data.append('carModel', carForm.carModel)
            data.append('carPrice', carForm.carPrice)
            data.append('carSeats', carForm.carSeats)
            data.append('carYear', carForm.carYear)
            data.append('carHeader', carForm.carHeader)
            data.append('carId', carDetail?.carId)

            var config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/edit-car-data',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    toaster.success("แก้ไขข้อมูลสำเร็จ.", {
                        description: response.data
                    })
                    Router.reload(window.location.pathname)
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
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
    const onImageDelete = (imageId: number) => {
        setOldCarImage(oldCarImage?.filter((e) => { return e.imageId != imageId }))
        carImageIDDelete.push(imageId);
    }
    const onImageDefectDelete = (imageId: number) => {
        setOldCarImageDefect(oldCarImageDefect?.filter((e) => { return e.imageId != imageId }))
        carImageIDDefectDelete.push(imageId);
    }
    useEffect(() => {
        if (carDetail) {
            const response = carService.getModelList(carDetail.carBrand)
            response.then((res) => {
                setModels!(res)
            })
            setOldCarImage(carDetail.carImages)
            setOldCarImageDefect(carDetail.carImagesDefect)
        }
        getBrandList()

    }, [])
    return (
        <div className={style['sell-main-container']}>
            <form onSubmit={handleSubmit(onUpload)} encType='multipart/form-data'>
                {isEdit ? <h3>แก้ไขข้อมูล</h3> : <h3>ขายรถยนต์</h3>}
                {isEdit && <div style={{ marginBottom: "16px" }}>
                    รูปรถยนต์
                    <EditPanel carImage={oldCarImage} onImageDelete={onImageDelete} />
                </div>}

                {carDetail?.carCondition === "มือสอง" ? <div style={{ marginBottom: "16px" }}>รูปภาพตำหนิ<EditPanel carImage={oldCarImageDefect} onImageDelete={onImageDefectDelete} /></div> : null}
                <div className={style['sell-box']}>
                    <h3>หัวข้อ</h3>
                    <InputText {...register('carHeader')} defaultValue={carDetail?.carHeader} />
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
                    <InputNumber onValueChange={(e) => setValue('carHorsePower', e.value!)} value={watch('carHorsePower')} required />
                </div>
                <div className={style['sell-box']}>
                    <h3>เลขไมล์ (กิโลเมตร)</h3>
                    <InputNumber onValueChange={(e) => setValue('carMileage', e.value!)} disabled={(watch('carCondition') === "มือหนึ่ง" || watch('carCondition') === null) ? true : false} required={watch('carCondition') === "EV" ? false : true} value={watch('carMileage')} />
                </div>
                <div className={style['sell-box']}>
                    <h3>จำนวนที่นั่ง</h3>
                    <SelectButton options={seats} value={watch('carSeats')} {...register("carSeats")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>อัตราสิ้นเปลือง (กิโลเมตร/ลิตร)</h3>
                    <InputNumber mode="decimal" value={watch('carFuelConsumption')} minFractionDigits={0} maxFractionDigits={2} onValueChange={(e) => setValue('carFuelConsumption', e.value!)} disabled={watch('carFuelType') === "EV" ? true : false} required={watch('carFuelType') === "EV" ? false : true} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ปี</h3>
                    <Dropdown className={style['dropdown']} options={year} placeholder="ระบุปีรถยนต์" value={watch('carYear')} {...register("carYear")} />
                </div>
                <div className={style['sell-box']}>
                    <h3>ระยะทาง(กิโลเมตร)/ชาร์จ 1 ครั้ง</h3>
                    <InputNumber value={watch('carEVRange')} onValueChange={(e) => setValue('carEVRange', e.value!)} disabled={watch('carFuelType') === "EV" ? false : true} required={watch('carFuelType') === "EV" ? true : false} />
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
                    <InputNumber onValueChange={(e) => setValue('carPrice', e.value!)} value={watch('carPrice')} required />
                </div>
                <div className={style['button-box']}>
                    {isEdit && <Button type='button' id={style["delete-car"]}>ลบประกาศ</Button>}
                    <Button type='submit'>ยืนยัน</Button>
                </div>
            </form>
        </div >
    )
}
export default SellCarPanel