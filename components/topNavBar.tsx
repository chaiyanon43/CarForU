import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';


import Link from 'next/link';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
const TopNavBar = () => {
    const [displayBasic, setDisplayBasic] = useState<boolean>(false);
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
    const items = [
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
        {
            style: { marginLeft: "auto" },
            template: <><Button style={{ width: "100px", height: "50px", marginRight:"16px",background:"rgb(20, 219, 20)",border:'solid 1px rgb(20, 219, 20)'}} label="Login"  onClick={() => setDisplayBasic(true)} />
                {displayBasic ? <Login displayBasic={displayBasic} renderFooter={renderFooter} setDisplayBasic={setDisplayBasic}/>: <></>}
                <Button style={{ width: "100px", height: "50px",background:"red",border:'solid 1px red' }} label="SignUp" onClick={() => setDisplayBasicSignup(true)}  />
                {displayBasicSignup ? <Signup displayBasicSignup={displayBasicSignup} renderFooterSignup={renderFooterSignup} setDisplayBasicSignup={setDisplayBasicSignup}/>: <></>}
                </>
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