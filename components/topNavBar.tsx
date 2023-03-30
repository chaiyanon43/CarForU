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
import { notificationRequest, UserProfileTag } from './interfaces';
import { UserService } from 'services/UserService';
import Cookies from "js-cookie";
import { toaster } from 'evergreen-ui';
import { Dropdown } from 'primereact/dropdown';
import { NotificationService } from 'services/Notification.service';
import { MenuItemCommandParams } from 'primereact/menuitem';
import { NotificationPanel } from './notificationPanel';
import style from "../src/styles/Header.module.css"
const TopNavBar = () => {
    const [displayBasic, setDisplayBasic] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileTag>();
    const [notification, setNotification] = useState<notificationRequest>();
    const [notiLabel, setNotiLabel] = useState<{
        label: string, command?(e: MenuItemCommandParams): void;
    }[]>([])
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const userService = new UserService();
    const menu = useRef(null);
    const notiMenu = useRef(null);
    const notificationService = new NotificationService();
    const [displayDialog, setDisplayDialog] = useState(false);
    const [notificationId,setNotificationId]= useState();
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
    const getNotifications = (userId: number) => {
        const response = notificationService.getNotificationList(userId)
        response.then((res) => {
            res.map((e) => {
                if (res.length > notiLabel.length) {
                    notiLabel.push(
                        {
                            label: "การติดต่อจากคุณ : " + e.contactorName,
                            command: () => { 
                                const response = notificationService.getNotificationDetail(e.notificationId)
                                response.then((res)=>{
                                    setNotification(res)
                                    setDisplayDialog(true)
                                })
                             }
                        }
                    )
                }
            })

        })
    }
    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            getItems();

        } if (sessionStorage.getItem('userId')) {
            getNotifications(Number(sessionStorage.getItem('userId')))
        }

    }, [sessionStorage.getItem('user'), sessionStorage.getItem('userId')])

    const start = <Link style={{ textDecoration: "none", fontWeight: "bold", margin: "0 8px", color: "#FEFEFE", letterSpacing: "2px" }} href={'/home'}>
        CAR<span style={{ color: "red", letterSpacing: "2px" }}>FORU</span>
    </Link>;
    const userDrop = [
        {
            label: 'ข้อมูลส่วนตัว',
            icon: 'pi pi-fw pi-user',
            command: () => { window.location.href = "/user-setting"; },
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
            command: () => { onClickMenu() },
        }
    ]
    const notiDrop = [
        {
            label: 'noti1',
        },
        {
            label: 'noti2',
        },
        {
            label: 'noti1',
        }
    ]
    const onClickNotification = (notiId: number) => {
        return <>Hello {notiId}</>
    }
    const onClickMenu = () => {
        sessionStorage.clear();
        localStorage.clear();
        Cookies.remove("token");
        toaster.success("Sign out", {
            description: `ออกจากระบบสำเร็จ`,
            duration: 3,
        });
        const response = router.push("/login");
    }
    const end = (<div style={{ display: "flex", alignItems: "center" }}>
        <div className={style["bell-box"]}><i className='pi pi-bell' style={{ color: "#FEFEFE" }} onClick={(event) => {
            notiMenu.current.toggle(event)
        }
        } ></i></div>
        <TieredMenu model={notiLabel} onClick={onClickMenu} popup ref={notiMenu} id={style["notification-drop"]}/>
        <TieredMenu model={userDrop} onClick={onClickNotification} popup ref={menu} id="overlay_tmenu" />
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
        </Button></div>)
    return (
        <div>
            {notification && <NotificationPanel displayDialog={displayDialog} setDisplayDialog={setDisplayDialog} notificationData={notification} setNotificationData={setNotification}/>}
            <Menubar
                model={items}
                start={start}
                end={sessionStorage.getItem('user') ? end : null}
            />
        </div>
    );
}
export default TopNavBar