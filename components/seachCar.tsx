import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import style from '../src/styles/Filter.module.css'
import { RadioButton } from 'primereact/radiobutton';
import { BuyCar } from './BuyCar/buy_new_car';
import { TreeSelect } from 'primereact/treeselect';
interface filterForm {
    range: [0, 10000000];
}
const SearchCar = (props: BuyCar) => {
    const {isSecond} = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<filterForm>();
    const [range, setRange] = useState<[number,number]>([200000, 5000000])
    const [year, setYear] = useState<[number,number]>([2012, 2023])
    const [seats, setSeats] = useState<any>([]);
    const [gears, setGears] = useState<any>([]);
    const [brandModel, setBeandModel] = useState<any>(null)
    const nodes = [
        {
            key: "0",
            label: "Honda",
            data: "Honda",
            children: [{
                key: "0-0",
                label: "City",
                data: "City",
            }, {
                key: "0-1",
                label: "Civic",
                data: "Civic",
            }]
        }
    ]
    const numberWithCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const onSeatChange = (e: any) => {
        let selectedSeats = [...seats];

        if (e.checked)
            selectedSeats.push(e.value);
        else
            selectedSeats.splice(selectedSeats.indexOf(e.value), 1);

        setSeats(selectedSeats);
    }
    const onGearChange = (e: any) => {
        let selectedGears = [...gears];

        if (e.checked)
            selectedGears.push(e.value);
        else
            selectedGears.splice(selectedGears.indexOf(e.value), 1);

        setGears(selectedGears);
    }
    return (
        <div>
            <div className={style['filter-container']}>
                <div className={style['filter-box']}>
                    <h3>ยี่ห้อ - รุ่น</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['brand-model']}>
                            <TreeSelect id={style['input-brand']} value={brandModel} options={nodes} display="chip" selectionMode="checkbox" onChange={(e) => setBeandModel(e.value)} filter placeholder="Select Items"></TreeSelect>
                        </div>
                    </div>
                </div>

                <div className={style['filter-box']}>
                    <h3>ราคา</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['header-slider']}>
                            <label>{numberWithCommas(range[0])}</label>
                            <label>{numberWithCommas(range[1])}</label>
                        </div>
                        <Slider value={range} onChange={(e:any) => setRange(e.value)} min={200000} max={5000000} step={400000} range />
                    </div>
                </div>
                <div className={style['filter-box']}>
                    <h3>ปี</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['header-slider']}>
                            <label>{year[0]}</label>
                            <label>{year[1]}</label>
                        </div>
                        <Slider value={year} onChange={(e:any) => setYear(e.value)} min={2012} max={2023} step={1} range />
                    </div>
                </div>
                <div className={style['filter-box']}>
                    <h3>เชื้อเพลิง</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['fuel-container']}>
                            <Button label="เบนซิน" className="p-button-raised p-button-rounded" />
                            <Button label="ดีเซล" className="p-button-raised p-button-rounded" />
                            <Button label="ไฮบริด" className="p-button-raised p-button-rounded" />
                            <Button label="EV" className="p-button-raised p-button-rounded" />
                        </div>
                    </div>
                </div>
                <div className={style['filter-box']}>
                    <h3>ที่นั่ง</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['seat-selected']}>
                            <div className="field-checkbox">
                                <Checkbox value="2" onChange={onSeatChange} checked={seats.indexOf('2') !== -1} />
                                <label>2</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox value="4" onChange={onSeatChange} checked={seats.indexOf('4') !== -1} />
                                <label>4</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox value="5" onChange={onSeatChange} checked={seats.indexOf('5') !== -1} />
                                <label>5</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox value="7" onChange={onSeatChange} checked={seats.indexOf('7') !== -1} />
                                <label>7</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style['filter-box']}>
                    <h3>ระบบเกียร์</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['gear-selected']}>
                            <div className="field-checkbox">
                                <Checkbox value="อัตโนมัติ" onChange={onGearChange} checked={gears.indexOf('อัตโนมัติ') !== -1} />
                                <label>อัตโนมัติ</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox value="ธรรมดา" onChange={onGearChange} checked={gears.indexOf('ธรรมดา') !== -1} />
                                <label>ธรรมดา</label>
                            </div>
                        </div>
                    </div>
                </div>
                {isSecond && <div className={style['filter-box']}>
                    <h3>เลขไมล์</h3>
                    <div className={style['filter-inside']}>
                        <div className={style['gear-selected']}>
                            <div className={style['radio-btn']}>
                                <RadioButton value="Cheese" />
                                <label>น้อยกว่า 20,000</label>
                            </div>
                            <div className={style['radio-btn']}>
                                <RadioButton value="Cheese" />
                                <label>น้อยกว่า 40,000</label>
                            </div>
                            <div className={style['radio-btn']}>
                                <RadioButton value="Cheese" />
                                <label>น้อยกว่า 70,000</label>
                            </div>
                            <div className={style['radio-btn']}>
                                <RadioButton value="Cheese" />
                                <label>มากกว่า 70,000</label>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default SearchCar