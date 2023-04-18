import { CommonFunc } from "components/commonFunc";
import { CarData } from "components/interfaces"
import { Label, toaster } from "evergreen-ui";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "../styles/CarCalculate.module.css"
import { InputSwitch } from 'primereact/inputswitch';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
    carDownPayment?: number,
    finance?: number,
    increasesPerYear?: number,
    allIncreases?: number,
    debt?: number,
    paymentPerMonth?: number,
    dataTable?: AfterCalEffectiveRate[]
}
interface AfterCalEffectiveRate {
    principle?: number
    paymentCount: number,
    paymentPerMonth: number,
    increases: number,
    deductPrinciple: number
}
const CarCalculate = (props: CarCalProps) => {
    const { carDetail } = props;
    const [checkedVat, setCheckedVat] = useState(false);
    const downPayment = [5, 10, 15, 20, 25]
    const installments = [12, 24, 36, 48, 60, 72, 84, 96]
    const [showResult, setShowResult] = useState<Boolean>(false);
    const [calTableData, setCalTableData] = useState<AfterCalEffectiveRate[]>([])
    const [result, setResult] = useState<AfterCalForm>()
    const [allPrinciple, setAllPrinciple] = useState<number>(0)
    const commonFunc = new CommonFunc();
    const { register, handleSubmit, watch, setValue, reset, getValues, formState: { errors } } = useForm<CarCalculateForm>({
        defaultValues: {
            carPrice: carDetail.carPrice
        }
    });
    const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        , 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        , 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        , 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        , 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const onCalculate: SubmitHandler<CarCalculateForm> = (cal) => {
        if (!cal.numberInstallment || !cal.percentDownPayment || !cal.percentIncreases) {
            toaster.notify("กรุณากรอกข้อมูลให้ครบถ้วน", { duration: 3 })
            return
        }
        if(calTableData.length !== 0){
            setCalTableData([])
        }
        let carDownPayment = cal.carPrice * (cal.percentDownPayment / 100);
        let finance = cal.carPrice - carDownPayment;
        let increasesPerYear = finance * (cal.percentIncreases / 100)
        let allIncreases = increasesPerYear * (cal.numberInstallment / 12)
        let debt = finance + allIncreases;
        let paymentPerMonth = Number.parseFloat((debt / cal.numberInstallment).toFixed(2))
        let principle = finance;
        setResult({
            carDownPayment: Math.round(carDownPayment * 100) / 100,
            finance: Math.round(finance * 100) / 100,
            increasesPerYear: Math.round(increasesPerYear * 100) / 100,
            allIncreases: Math.round(allIncreases * 100) / 100,
            debt: Math.round(debt * 100) / 100,
            paymentPerMonth: Math.round(paymentPerMonth)
        })
        let sumPriciple = 0;
        let sumIncrease = 0
        if (calTableData.length < cal.numberInstallment) {
            for (let i = 0; i < cal.numberInstallment; i++) {
                let effectiveRate = (cal.percentIncreases / 100) * 1.8
                let increasesInMonth = (principle * effectiveRate * dayOfMonth[i]) / 365
                let duductPrinciple = paymentPerMonth - increasesInMonth
                if ((cal.numberInstallment - i) == 1) {
                    paymentPerMonth = principle + increasesInMonth
                    duductPrinciple = principle
                }
                sumPriciple += Math.round(duductPrinciple)
                sumIncrease += Math.round(increasesInMonth);
                calTableData.push({
                    principle: Math.round(principle),
                    paymentCount: i + 1,
                    paymentPerMonth: Math.round(paymentPerMonth),
                    increases: Math.round(increasesInMonth),
                    deductPrinciple: Math.round(duductPrinciple)
                })
                principle -= duductPrinciple
            }
            setAllPrinciple(sumPriciple)
        }

        setShowResult(true)

    }
    const resetCal = () => {
        setShowResult(false)
        setResult({});
        setCalTableData([])
        reset()
    }
    const paymentPerMonthTemplate=(rowData:any)=>{
        return <label>{commonFunc.numberWithCommas(rowData.paymentPerMonth)}</label>
    }
    const principleTemplate=(rowData:any)=>{
        return <label>{commonFunc.numberWithCommas(rowData.principle)}</label>
    }
    const increasesTemplate=(rowData:any)=>{
        return <label>{commonFunc.numberWithCommas(rowData.increases)}</label>    }
    const deductPrincipleTemplate=(rowData:any)=>{
        return <label>{commonFunc.numberWithCommas(rowData.deductPrinciple)}</label>    }
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
                    </div>

                    <div className={style["cal-box"]}>
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
                                <InputNumber minFractionDigits={0} maxFractionDigits={2} min={0} max={15} style={{ width: "160px" }} id={style["price"]} onValueChange={(e) => setValue("percentIncreases", e.value!)}></InputNumber>
                                <label>% ต่อปี</label>
                            </div>
                        </div>
                        {/* <div className={style["cal-inside"]}>
                            <label>เป็นเงินดาวน์</label>
                            <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.carDownPayment ? commonFunc.numberWithCommas(result?.carDownPayment) : null}</span> บาท</label>
                        </div>
                        <div className={style["cal-inside"]}>
                            <label>ยอดจัดไฟแนนซ์</label>
                            <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.finance ? commonFunc.numberWithCommas(result?.finance) : null}</span> บาท</label>
                        </div> */}
                    </div>
                </div>
                <div className={style['after-cal']}>
                    <div className={style["after-cal-inside"]}>
                        <label>เป็นเงินดาวน์</label>
                        <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.carDownPayment ? commonFunc.numberWithCommas(result?.carDownPayment) : null}</span> บาท</label>
                    </div>
                    <div className={style["after-cal-inside"]}>
                        <label>ยอดจัดไฟแนนซ์</label>
                        <label><span style={{ color: "rgb(80, 200, 120)" }}>{result?.finance ? commonFunc.numberWithCommas(result?.finance) : null}</span> บาท</label>
                    </div>
                    {/* {showResult && <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                        <div>
                            <label style={{ display: "flex", alignItems: "center" }}>Vat 7%</label>
                            <InputSwitch checked={checkedVat} onChange={(e) => setCheckedVat(e.value)} />
                        </div>
                    </div>} */}
                    {showResult && <label>ค่างวด/เดือน <span style={{ color: "rgb(50, 205, 50)" }}>{result?.paymentPerMonth ? commonFunc.numberWithCommas(Math.round(result?.paymentPerMonth + (checkedVat ? (result?.paymentPerMonth * 0.07) : (0)))) : null}</span> บาท</label>}
                    {showResult ? <>
                        <DataTable value={calTableData} totalRecords={calTableData.length} paginator showGridlines stripedRows responsiveLayout="scroll"
                            rows={12}>
                            <Column field="paymentCount" header="งวดที่" ></Column>
                            <Column field="paymentPerMonth" body={paymentPerMonthTemplate} header="ยอดที่ผ่อน/เดือน" ></Column>
                            <Column field="principle" body={principleTemplate} header="เงินต้นคงเหลือ" ></Column>
                            <Column field="increases" body={increasesTemplate} header="ชำระส่วนดอกเบี้ย" ></Column>
                            <Column field="deductPrinciple" body={deductPrincipleTemplate} header="ชำระส่วนเงินต้น" ></Column>
                        </DataTable>
                    </>:null}
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