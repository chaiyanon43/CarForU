import style from '../../src/styles/SellCar.module.css'
import { CarImage } from 'components/interfaces'
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
interface ImageDeleteForm{
    imageDetail? :CarImage,
    onImageDelete: any
}
const ImageDelete= (props:ImageDeleteForm) =>{
    const {imageDetail,onImageDelete} = props;
    const [displayDialog, setDisplayDialog] = useState<boolean>(false);
    const renderFooter = () => {
        return (
            <div>
                <Button label="ยกเลิก" icon="pi pi-times" onClick={() => {
                    setDisplayDialog(false)
                }} className="p-button-text" />
                <Button label="ยืนยัน" icon="pi pi-check" onClick={() => {
                    onImageDelete(imageDetail?.imageId)
                    setDisplayDialog(false)
                }} autoFocus />
            </div>
        );
    }
    return (
        <div className={style["image-box"]} key={imageDetail?.imageId}>
            <i className="pi pi-times-circle" key={imageDetail?.imageId} onClick={() => setDisplayDialog(true)}></i>
            <img src={`data:image/jpeg;base64,${imageDetail?.carImage}`}></img>
            <Dialog header="ยืนยันการลบรูปภาพนี้ออกหรือไม่?" visible={displayDialog} style={{ width: '600px', maxWidth: "90%" }} footer={renderFooter()} onHide={() => setDisplayDialog(false)}>
            </Dialog>
        </div>
        )
}
export default ImageDelete