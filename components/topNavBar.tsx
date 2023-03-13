import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
import { Menubar } from 'primereact/menubar';
import Image from "next/image";
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { MegaMenu } from 'primereact/megamenu';
import mainlogo from "../images/logo-main.png";
import Link from 'next/link';
import Login from '@/pages/login';
import Signup from '@/pages/sign-up';
import { UserProfileTag } from './interfaces';
import { UserService } from 'services/UserService';
import Cookies from "js-cookie";
import { toaster } from 'evergreen-ui';
const TopNavBar = () => {
    const [displayBasic, setDisplayBasic] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileTag>();
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const userService = new UserService();
    const menu = useRef(null);
    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => setDisplayBasic(false)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => setDisplayBasic(false)} type='submit' autoFocus />
            </div>
        );
    }
    const [displayBasicSignup, setDisplayBasicSignup] = useState<boolean>(false);
    const renderFooterSignup = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayBasicSignup(false)} className="p-button-text" />
            </div>
        );
    }
    const getItems = () => {
        const response = userService.getUserProfile();
        response.then((res) => {
            setUserProfile!(res)
        })
        setItems([
            {
                label: 'ซื้อรถยนต์ใหม่',
                icon: 'pi pi-fw pi-car',
                command: () => { window.location.href = "/buy-new"; },
            },
            {
                label: 'ซื้อรถยนต์มือสอง',
                icon: 'pi pi-fw pi-replay',
                command: () => { window.location.href = "/second-hand-car"; }
            },
            {
                label: 'ประกาศขายรถยนต์',
                icon: 'pi pi-fw pi-dollar',
                command: () => { window.location.href = "/sell-car"; }
            },
        ])
    }
    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            getItems();
        }
    }, [sessionStorage.getItem('user')])

    const start = <Link style={{ textDecoration: "none", fontWeight: "bold", margin: "0 8px", color: "#FEFEFE", letterSpacing: "2px" }} href={'/home'}>
        CAR<span style={{ color: "red", letterSpacing: "2px" }}>FORU</span>
    </Link>;
    const userDrop = [
        {
            label: 'ข้อมูลส่วนตัว',
            icon: 'pi pi-fw pi-user',
            command: () => { onClickMenu(1) },
        },
        {
            label: 'รถของฉัน',
            icon: 'pi pi-fw pi-car',
            command: () => { window.location.href = "/my-car"; },
        },
        {
            label: 'รายการที่ชื่นชอบ',
            icon: 'pi pi-fw pi-heart-fill',
            command: () => { window.location.href = "/favorite-car"; },
        },
        {
            label: 'ออกจากระบบ',
            icon: 'pi pi-fw pi-sign-out',
            command: () => { onClickMenu(3) },
        }
    ]
    const onClickMenu=(e:number)=>{
        if(e===3){
            sessionStorage.clear();
            localStorage.clear();
            Cookies.remove("token");
            toaster.success("Sign out", {
                description: `ออกจากระบบสำเร็จ`,
                duration: 3,
            });
            const response = router.push("/login");
        }
    }
    const end = (<>
        <TieredMenu model={userDrop} onClick={onClickMenu} popup ref={menu} id="overlay_tmenu" />
        <Button style={{ background: "transparent", border: "none" }} onClick={(event) => menu.current.toggle(event)} aria-haspopup aria-controls="overlay_tmenu">
            <div style={{ width: "auto", display: 'flex' }}>
                <div style={{ marginRight: "12px", width: "30px", height: "30px", overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "25px" }}>
                    <img style={{ width: '100%', objectFit: 'cover' }} src={`data:image/jpeg;base64,${userProfile?.image}`}></img>
                </div>
                <p style={{
                    display: "flex",
                    justifyContent: "center", 
                    textShadow: "0 2px 2px rgb(255,255,255,0.2)", 
                    textTransform: 'uppercase'
                }}>
                    {userProfile?.name}
                </p>
            </div>
        </Button></>)
    return (
        <div>
            <Menubar
                model={items}
                start={start}
                end={sessionStorage.getItem('user') ? end:null}
            />
        </div>
    );
}
export default TopNavBar