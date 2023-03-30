import { CommonFunc } from "components/commonFunc";
import { CarData } from "components/interfaces"
import { toaster } from "evergreen-ui";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "../styles/CarCalculate.module.css"
import { InputSwitch } from 'primereact/inputswitch';

interface CarCalProps {
    carDetail: CarData;
}
interface CarCalculateForm {
    carPrice: number,
    percentDownPayment: number,
    numberInstallment: number,
    percentIncreases: number

}
interface AfterCalForm {
    carDownPayment: number,
    finance: number,
    increasesPerYear: number,
    allIncreases: number,
    debt: number,
    paymentPerMonth: number
}
const CarCalculate = (props: CarCalProps) => {
    const { carDetail } = props;
    const [checkedVat, setCheckedVat] = useState(false);
    const downPayment = [5, 10, 15, 20, 25]
    const installments = [12, 24, 36, 48, 60, 72, 84, 96]
    const [showResult, setShowResult] = useState<Boolean>(false);
    const [result, setResult] = useState<AfterCalForm>()
    const commonFunc = new CommonFunc();
    const { register, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm<CarCalculateForm>({
        defaultValues: {
            carPrice: carDetail.carPrice
        }
    });
    const onCalculate: SubmitHandler<CarCalculateForm> = (cal) => {
        if (!cal.numberInstallment || !cal.percentDownPayment || !cal.percentIncreases) {
            toaster.notify("กรุณากรอกข้อมูลให้ครบถ้วน", { duration: 3 })
            return
        }
        let carDownPayment = cal.carPrice * (cal.percentDownPayment / 100);
        let finance = cal.carPrice - carDownPayment;
        let increasesPerYear = finance * (cal.percentIncreases / 100)
        let allIncreases = increasesPerYear * (cal.numberInstallment / 12)
        let debt = finance + allIncreases;
        let paymentPerMonth = Math.ceil(debt / cal.numberInstallment)
        setResult({
            carDownPayment: carDownPayment,
            finance: finance,
            increasesPerYear: increasesPerYear,
            allIncreases: allIncreases,
            debt: debt,
            paymentPerMonth: paymentPerMonth
        })
        setShowResult(true)

    }
    const resetCal = () => {
        setShowResult(false)
        setResult({});
        reset()
    }

    return (
        <div className={style["cal-main"]}>
            <form onSubmit={handleSubmit(onCalculate)} onReset={resetCal}>
                <div className={style["cal-container"]}>
                    <div className={style["cal-box"]}>
                        <div className={style["cal-inside"]}>
                            <label>ราคารถ</label>
                            <div className={style["cal-detail"]}>
                                <InputNumber style={{ width: "160px" }} value={carDetail.carPrice} disabled></InputNumber>
                                <label>บาท</label>
                            </div>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>จำนวนเงินดาวน์</label>
                            <div className={style["cal-detail"]}>
                                <Dropdown style={{ width: "160px" }} options={downPayment} placeholder="เงินดาวน์" value={watch("percentDownPayment")} onChange={(e) => setValue("percentDownPayment", e.value)} />
                                <label>%</label>
                            </div>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>จำนวนงวด</label>
                            <div className={style["cal-detail"]}>
                                <Dropdown style={{ width: "160px" }} options={installments} placeholder="จำนวนงวด" value={watch("numberInstallment")} onChange={(e) => setValue("numberInstallment", e.value)} />
                                <label>เดือน</label>
                            </div>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>ดอกเบี้ย</label>
                            <div className={style["cal-detail"]}>
                                <InputNumber minFractionDigits={0} maxFractionDigits={2} style={{ width: "160px" }} id={style["price"]} onValueChange={(e) => setValue("percentIncreases", e.value!)}></InputNumber>
                                <label>% ต่อปี</label>
                            </div>
                        </div>
                    </div>

                    <div className={style["cal-box"]}>
                        <div className={style["cal-inside"]}>
                            <label>เป็นเงินดาวน์</label>
                            <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.carDownPayment ? commonFunc.numberWithCommas(result?.carDownPayment) : null}</span> บาท</label>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>ยอดจัดไฟแนนซ์</label>
                            <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.finance ? commonFunc.numberWithCommas(result?.finance) : null}</span> บาท</label>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>ดอกเบี้ย/ปี <span style={{ color: "rgb(80, 200, 120)" }}>{result?.increasesPerYear ? commonFunc.numberWithCommas(result?.increasesPerYear) : null}</span> บาท</label>
                            <label>ทั้งหมด <span style={{ color: "rgb(80, 200, 120)" }}>{result?.allIncreases ? commonFunc.numberWithCommas(result?.allIncreases) : null}</span> บาท</label>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>ยอดหนี้ทั้งหมด</label>
                            <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.debt ? commonFunc.numberWithCommas(result?.debt) : null}</span> บาท</label>
                        </div>
                    </div>
                </div>
                <div className={style['after-cal']}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center",marginBottom:"8px" }}>
                        <div>
                            <label style={{display:"flex",alignItems:"center"}}>Vat 7%</label>
                            <InputSwitch checked={checkedVat} onChange={(e) => setCheckedVat(e.value)} />
                        </div>
                    </div>
                    {showResult && <label>ค่างวด/เดือน <span style={{ color: "rgb(50, 205, 50)" }}>{result?.paymentPerMonth ? commonFunc.numberWithCommas(result?.paymentPerMonth) : null}</span> บาท</label>}
                    <div className={style['button-cal']}>
                        <Button onReset={resetCal} type={"reset"} id={style["clear-btn"]}>Clear</Button>
                        <Button onSubmit={handleSubmit(onCalculate)} type={"submit"} id={style["submit-btn"]}>คำนวณ</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CarCalculate