import { CarData, carCard, userForm } from "components/interfaces";
import { useCallback, useEffect, useState } from "react";
import { UserService } from "services/UserService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import style from '../../styles/AllUser.module.css'
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CarService } from "services/CarService";
const Users = () => {
    const [userList, setUserList] = useState<userForm[]>([]);
    const [displayCar, setDisplayCar] = useState<boolean>(false);
    const [carList,setCarList] = useState<CarData[]>([])
    const userService = new UserService();
    const carService = new CarService();
    const getAllUser = useCallback(() => {
        const response = userService.getAllUser()
        response.then((res) => {
            setUserList(res)
        })
    }, [])
    const statusTemplate = (rowData: any) => {
        return <div id={rowData.status === 1 ? style['active'] : style['baned']} >{rowData.status === 1 ? "Active" : "Baned"}</div>
    }
    const getCarList=(userId:number)=>{
        const response = carService.getCarTable(userId)
        response.then((res)=>{
            setCarList(res)
        })
        setDisplayCar(true);
    }
    const buttonTemplate = (rowData: any) => {
        return (
            <div className={style['table-btn-container']}>
                <Button id={style["user-car"]} onClick={(e) => getCarList(rowData.userId)}>รถยนต์</Button>
                <Button id={style["user-detail"]}>ข้อมูล</Button>
                <Button id={style["user-ban"]}>ระงับ</Button>
            </div>
        )

    }
    const carDetailButton = (rowData: any) => {
        return <Button onClick={(e)=> window.location.href = '/car-detail/' + rowData.carId}>ข้อมูล</Button>
    }
    const usernameTemplate = (rowData: any) => {
        return (<p id={style['username']}>{rowData.username}</p>)
    }
    const nameTemplate = (rowData: any) => {
        return (<p id={style['username']}>{rowData.name}</p>)
    }
    const carConditionTemplate = (rowData:any) =>{
        return (<p id={style['username']}>{rowData.carCondition}</p>)
    }
    const brandTemplate = (rowData:any) =>{
        return (<p id={style['username']}>{rowData.carBrand}</p>)
    }
    const carStatusTemplate = (rowData:any) =>{
        return <div id={rowData.carStatus === 1 ? style['active'] : style['baned']} >{rowData.status === 1 ? "Active" : "Baned"}</div>
    }

    useEffect(() => {
        getAllUser();
    }, [getAllUser])
    return (
        <div className={style['user-main-container']}>
            <h1>บัญชีผู้ใช้งานทั้งหมด</h1>
            <DataTable value={userList} paginator showGridlines stripedRows id={style['user-table']} rows={5} rowsPerPageOptions={[5, 10, 20]}>
                <Column field="userId" header="ID" ></Column>
                <Column field="username" header="Username" body={usernameTemplate} headerClassName="header-username" bodyClassName="header-username"></Column>
                <Column field="name" header="Name" body={nameTemplate}></Column>
                <Column field="status" header="Status" body={statusTemplate}></Column>
                <Column body={buttonTemplate}></Column>
            </DataTable>
            <Dialog header="รถยนต์ทั้งหมดของผู้ใช้งาน" visible={displayCar} style={{maxWidth: "95%", width: "700px" }} onHide={() => setDisplayCar(false)}>
                <div className={style['car-detaile-table-container']}>
                    <DataTable value={carList} paginator showGridlines stripedRows id={style['user-table']} rows={5} rowsPerPageOptions={[5, 10, 20]}>
                        <Column field="carId" header="ID" ></Column>
                        <Column field="carCondition" header="สภาพ" body={carConditionTemplate} headerClassName="header-username" bodyClassName="header-username"></Column>
                        <Column field="carBrand" header="ยี่ห้อ-รุ่น" body={brandTemplate}></Column>
                        <Column field="carStatus" header="Status" body={carStatusTemplate}></Column>
                        <Column header="ข้อมูลรถ" body={carDetailButton}></Column>
                    </DataTable>
                </div>
            </Dialog>
        </div>
    )
}
export default Users