import Login from "./login"
import style from 'src/styles/Home_Style.module.css'
import { Button } from 'primereact/button';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import styleButton from "../styles/Login.module.css"
import carBackground from "../../images/carBackground.jpg"
import Image from "next/image";
const Home = () => {
    return (
        <div className={style["home-main-container"]}>
            {/* <Image 
                src={carBackground} 
                width={"26"}
                height={"26"} /> */}
            <div className={style[""]}>
                <p className={style["Text_Top_Home"]}>Welcome To CARFORU</p>
                <p className={style["Text_Sub_Top_Home"]}>CARFORU เป็นเว็บไซต์สำหรับการซื้อขายรถยนต์</p>
                <p className={style["Text_Sub_Top_Home"]}>ผู้ใช้งานสามารถติดต่อซื้อรถกับผู้ประกาศขายผ่านเว็บไซต์</p>
                <p className={style["Text_Sub_Top_Home"]}>เว็บไซต์รองรับรถยนต์หลากหลายระบบทั้งมือหนึ่งและมือสอง</p>
                <p className={style["Text_Sub_Top_Home"]}>และยังสามารถรองรับรับรถ EV อีกด้วย</p>
            </div>
            {sessionStorage.getItem("user") ? null : <div className={style["button-search-form"]}>
                <Link style={{ textDecoration: "none", color: "#FEFEFE" }} href={'/sign-up'}>
                    <Button id={styleButton['signup']} style={{ background: "rgb(51, 51, 51)", boxShadow: "0 5px 10px rgb(0,0,0,0.32)", border: "none" }}>สร้างบัญชี</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} href={'/login'}>
                    <Button id={styleButton['login']} style={{ background: "#FEFEFE", color: "rgb(51, 51, 51)", boxShadow: "0 5px 10px rgb(0,0,0,0.32)", border: "none" }}>เข้าสู่ระบบ</Button>
                </Link>
            </div>}

        </div>
    )
}
export default Home