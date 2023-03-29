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
    const [brands, setBrands] = useState<[]>([])
    const carService = new CarService();

    const getAllBrands = () => {
        const response = carService.getBrandList();
        response.then((res)=>{
            setBrands!(res)
        })
    }
    const onAddModel: SubmitHandler<carBrandAdd> = (brand) => {
        axios.post("http://localhost:8080/add-model", {
            brandName:brand.brandName,
            modelName:brand.modelName   
        }).then((e)=>{
            toaster.success(e.data)
        }).catch((err)=>{
            toaster.danger(err)
        })
        
    }

    useEffect(() => {
        getAllBrands();
    }, [])
    return (
        <div className={style['add-model-container']}>
            <h2>เพิ่มรุ่นรถยนต์</h2>
            <form onSubmit={handleSubmit(onAddModel)}>
                <Dropdown className={style["brand-dropdown"]} options={brands} placeholder="ระบุยี่ห้อ" value={watch('brandName')} {...register("brandName")} />
                <InputText {...register('modelName')} />
                <Button>Add</Button>
            </form>

        </div>
    )
}
export default AddModel