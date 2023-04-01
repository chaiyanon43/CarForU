import axios from "axios"
import { Dropdown } from "primereact/dropdown"
import { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import style from "../../styles/AddModel.module.css"
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button"
import { toaster } from "evergreen-ui";
import { CarService } from "services/CarService"


interface carBrandAdd {
    brandName: String,
    modelName: String
}
const AddModel = () => {
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<carBrandAdd>();
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, getValues: getValues2, formState: { errors: err2 } } = useForm<carBrandAdd>();

    const [brands, setBrands] = useState<[]>([])
    const [isBrand, setIsBrand] = useState<boolean>(true)
    const carService = new CarService();

    const getAllBrands = () => {
        const response = carService.getBrandList();
        response.then((res) => {
            setBrands!(res)
        })
    }
    const onAddModel: SubmitHandler<carBrandAdd> = (brand) => {
        axios.post("http://localhost:8080/add-model", {
            brandName: brand.brandName,
            modelName: brand.modelName
        }).then((e) => {
            toaster.success(e.data)
        }).catch((err) => {
            toaster.danger(err)
        })

    }
    const onAddBrand: SubmitHandler<carBrandAdd> = (brand) => {
        axios.post("http://localhost:8080/add-brand", {
            brandName: brand.brandName,
            
        }).then((e) => {
            toaster.success(e.data)
        }).catch((err) => {
            toaster.danger(err)
        })

    }

    useEffect(() => {
        getAllBrands();
    }, [])
    return (
        <>
            <div className={style['add-model-container']}>
                <div className={style['add-model-btn']}>
                    <Button onClick={(e)=>setIsBrand(true)}>เพิ่มยี่ห้อ</Button>
                    <Button onClick={(e)=>setIsBrand(false)}>เพิ่มรุ่น</Button>
                </div>
                {isBrand ?
                    <><h2>เพิ่มยี่ห้อรถยนต์</h2>
                        <form onSubmit={handleSubmit2(onAddBrand)}>
                            <InputText placeholder="ระบุยี่ห้อรถยนต์" {...register2('brandName')} />
                            <Button>Add</Button>
                        </form></>
                    :
                    <>
                        <h2>เพิ่มรุ่นรถยนต์</h2>
                        <form onSubmit={handleSubmit(onAddModel)} style={{marginTop:"16px"}}>
                            <Dropdown className={style["brand-dropdown"]} options={brands} placeholder="ระบุยี่ห้อ" value={watch('brandName')} {...register("brandName")} />
                            <InputText {...register('modelName')} />
                            <Button>Add</Button>
                        </form>
                    </>}

            </div>
        </>
    )
}
export default AddModel