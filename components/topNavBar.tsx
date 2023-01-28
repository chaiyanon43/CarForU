import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';


import Link from 'next/link';
import Login from '@/pages/login';
const TopNavBar = () => {
    const [displayBasic, setDisplayBasic] = useState<boolean>(false);
    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => setDisplayBasic(false)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => setDisplayBasic(false)} autoFocus />
            </div>
        );
    }
    const items = [
        {
            label: 'ซื้อรถยนต์ใหม่',
            icon: 'pi pi-fw pi-car',
            command: () => { window.location.href = "/buy_new_car"; }
        },
        {
            label: 'ซื้อรถยนต์มือสอง',
            icon: 'pi pi-fw pi-replay',

        },
        {
            label: 'ประกาศขายรถยนต์',
            icon: 'pi pi-fw pi-dollar',

        },
        {
            style: { marginLeft: "auto" },
            template: <><Button style={{ width: "100px", height: "50px", marginRight:"16px"}} label="Login"  onClick={() => setDisplayBasic(true)} />
                {displayBasic ? <Login displayBasic={displayBasic} renderFooter={renderFooter} setDisplayBasic={setDisplayBasic}/>: <></>}
                <Button style={{ width: "100px", height: "50px" }} label="SignUp" /></>

        }
    ];

    const start = <Link style={{ textDecoration: "none", fontWeight: "bold" }} href={'/home'}>CarForU</Link>;
    return (
        <div>
            <Menubar
                model={items}
                start={start}
            />
        </div>
    );
}
export default TopNavBar