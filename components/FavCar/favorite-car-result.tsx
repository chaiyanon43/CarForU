import CarCard from "components/carCard";
import { carCard } from "components/interfaces"
import style from '../../src/styles/NewCar.module.css'
const FavoriteCarResult = (props: { carCards: carCard[],favCarId?:number[],getFavCar:any }) => {
    const { carCards,favCarId ,getFavCar} = props;

    return (
        <div className={style["main-container"]}>
            <div className={style["card-container"]}>
                
                {carCards.map((car) => {
                    return (<><CarCard carDetail={car} carFavId={favCarId} getFavId={getFavCar}/></>

                    )
                })}
            </div>
        </div>
    )
}
export default FavoriteCarResult