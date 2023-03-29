import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Dispatch, SetStateAction, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { NotificationService } from "services/Notification.service"
import style from '../src/styles/DetailPage.module.css'
import { CarData, notificationRequest, User } from "./interfaces"
interface notificationForm {
    user?: User,
    car?: CarData,
    isSend?: boolean,
    displayDialog: boolean,
    setDisplayDialog: Dispatch<SetStateAction<boolean>>
    notificationData?: notificationRequest;
}
export const NotificationPanel = (props: notificationForm) => {
    const { user, car, isSend, displayDialog, setDisplayDialog, notificationData } = props;
    const notificationService = new NotificationService();

    const contact = [
        { name: 'Phone', code: 'ระบุเบอร์โทรศัพท์' },
        { name: 'LINE ID', code: 'ระบุ Line ID' },
        { name: 'E-Mail', code: 'ระบุ E-mail' },
    ];
    console.log(notificationData)
    const { register, handleSubmit, reset, getValues, watch, setValue, resetField, formState: { errors } } = useForm<notificationRequest>({
        defaultValues:
            notificationData
    });

    const onContact: SubmitHandler<notificationRequest> = (noti) => {
        noti.carId = car?.carId,
            noti.userId = user?.userId
        noti.notificationContactor = Number(sessionStorage.getItem("userId"))
        notificationService.sendNotification(noti)
        reset()
        setDisplayDialog(false)
    }
    const renderFooter = () => {
        return (
            <div>
                <Button type="reset" label="ยกเลิก" icon="pi pi-times" onClick={() => {
                    reset()
                    setDisplayDialog(false)
                }} className="p-button-text" />
                <Button type="submit" label="ติดต่อ" onClick={handleSubmit(onContact)} icon="pi pi-check" />
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit(onContact)}>
            <Dialog header={notificationData ? notificationData.carHeader : "กรอกข้อมูลเพื่อให้ผู้ขายติดต่อกลับ"} visible={displayDialog} style={{ width: '600px', maxWidth: "90%" }} footer={notificationData ? null : renderFooter()} onHide={() => setDisplayDialog(false)}>
                {notificationData &&
                    <div className={style["notification-img"]}>
                        <img src={`data:image/jpeg;base64,${notificationData.carImage}`}></img>
                    </div>
                }
                <div className={style["contact-container"]}>
                    {notificationData &&
                        <div className={style["contact-box"]}>
                            <label>ผู้ติดต่อ</label>
                            <InputText value={watch('contactorName')} disabled={true} />
                        </div>
                    }
                    <div className={style["contact-box"]}>
                        <label>ช่องทางการติดต่อ</label>
                        <div className={style["input-contact"]}>
                            {notificationData ?
                                <InputText id={style["contact-title"]} value={watch('notificationContactType')} disabled={watch("notificationContactType") === undefined || notificationData} />
                                : <Dropdown id={style["contact-title"]} value={watch('notificationContactType')} onChange={(e) => setValue("notificationContactType", e.value)} options={contact} optionLabel="name" placeholder="ช่องทางการติดต่อ" disabled={notificationData} />}
                            <InputText id={style["contact-data"]} placeholder={watch("notificationContactType.code")}  {...register("notificationContact")} disabled={watch("notificationContactType") === undefined || notificationData} />
                        </div>
                    </div>
                    <div className={style["contact-box"]}>
                        <label>รายละเอียด</label>
                        <InputTextarea id={style["desc"]} style={{ margin: "8px 0", overflow: "auto" }} rows={5} cols={30} autoResize placeholder="กรุณากรอกรายละเอียดหรือข้อมูลที่ต้องการสอบถามเบื้องต้น"
                            onChange={(e) => setValue("notificationDesc", e.target.value)} value={watch("notificationDesc")} disabled={notificationData} />
                    </div>
                </div>
            </Dialog>

        </form>
    )
}
