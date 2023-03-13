import CarCard from "components/carCard";
import { carCard } from "components/interfaces"
import style from '../../src/styles/NewCar.module.css'

interface myCarsProps {
    myCars: carCard[];
}
const MyCarResult = (props: myCarsProps) => {
    const { myCars } = props
    return (
        <div className={style["main-container"]}>
            <div className={style["card-container"]}>
                {myCars.map((e, index) => {
                    return (
                        <>
                            <CarCard carDetail={e} />
                        </>

                    )
                })
                }
            </div>
        </div>
    )
}
export default MyCarResult