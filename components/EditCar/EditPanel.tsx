import { CarImage } from 'components/interfaces'
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import style from '../../src/styles/SellCar.module.css'
import ImageDelete from './ImageDelete';
interface CarImageEdit {
    carImage: CarImage[]|undefined;
    carImageDefect?: CarImage[];
    onImageDelete: Function;
    carImageIdDelete?: number[];
}
const EditPanel = (props: CarImageEdit) => {
    const { carImage, onImageDelete, carImageIdDelete } = props
    return (
        <div className={style["edit-image-box"]}>
            {carImage!.map((e) => {
                return  <><ImageDelete imageDetail={e} onImageDelete={onImageDelete} /></>
            })}
        </div >
    )
}
export default EditPanel