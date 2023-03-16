import { Dialog } from 'primereact/dialog';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'react-phone-number-input/style.css';
import style from '../../src/styles/SignUp.module.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from 'primereact/button';
import React from 'react';
import Image from 'next/image';
import { FileUpload } from 'primereact/fileupload';
import Link from 'next/link';
import { userForm } from 'components/interfaces';
import { watch } from 'fs';
import { UserService } from 'services/UserService';
import { toaster } from 'evergreen-ui';
import { useRouter } from 'next/router';

interface userDetail {
    user: userForm,
    getUserDetail: Function
}
const UserSettingResult = (props: userDetail) => {
    const { user, getUserDetail } = props
    const { register, handleSubmit, getValues, watch, setValue, resetField, formState: { errors } } = useForm<userForm>({
        defaultValues: user
    });
    const [fileName, setFileName] = useState<string>('None');
    const [file, setFile] = useState();
    const [imageURL, setImageURL] = useState<string>();
    const [block, setBlock] = useState<boolean>(true);
    const hiddenFileInput = React.useRef(null);
    const userService = new UserService();
    const router = useRouter()
    const handleClick = (event: any) => {
        hiddenFileInput.current!.click();
    };
    useEffect(() => {
        setFile(user.image)
    }, [])
    const userSubmmit: SubmitHandler<userForm> = async (user) => {
        var axios = require('axios');
        var FormData = require('form-data');

        var data = new FormData();
        if (user.image === file || user.image === null) {

        } else {
            data.append('image', user.image);
        }
        data.append('username', user.username);
        data.append('name', user.name);
        data.append('phoneNumber', user.phoneNumber);
        data.append('address', user.address);
        data.append('userId', user.userId);

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/updateUser?',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                toaster.success(res.data, {
                    duration: 5,
                });
                sessionStorage.setItem('user', user.username)
                router.reload(window.location.pathname)
            })
            .catch(function (error) {
                toaster.danger("username ใช้ไปแล้ว", {
                    duration: 5,
                });
            });
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files[0]) {
                setValue('image', event.target.files[0])
                setImageURL(URL.createObjectURL(event.target.files[0]))
                setFileName(event.target.files[0].name)
            }
        }
    };
    return (
        <div>
            <div className={style['signup-container']}>
                <div className={style['signup-box']}>
                    <form
                        onSubmit={handleSubmit(userSubmmit)}
                        encType='multipart/form-data'>
                        <div>
                            <div className={style["profile-image"]}>
                                <i className='pi pi-user' >
                                    {getValues('image') && <img style={{ border: "2px solid #FEFEFE" }} src={imageURL ? imageURL : `data:image/jpeg;base64,${user?.image}`} />}
                                    <i className='pi pi-times-circle' onClick={(e) => {
                                        if (block) {
                                            return
                                        } else {
                                            setImageURL('')
                                            setFileName('')
                                            setFile(undefined)
                                            setValue('image', '')
                                        }

                                    }} ></i>
                                </i>
                                <label style={{ color: "#FEFEFE" }}>Choose file: <span><input className={style['input-file-name']} value={fileName} disabled></input></span></label>
                                <button type='button' disabled={block} onClick={handleClick}>Upload a file</button>
                                <input type='file' ref={hiddenFileInput}
                                    onChange={handleChange} id={style["file-input"]} />
                            </div>
                            <div className={style['sigup-inside']}>
                                <label>Username</label>
                                <InputText disabled={block} placeholder='Username' {...register("username")} />
                            </div>
                            {/* <div className={style['sigup-inside']}>
                            <label >Password</label>
                            <Password placeholder='Password' feedback={false} onChange={(e) => setValue('password', e.target.value)} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Confirm Password</label>
                            <Password placeholder='Confirm Password' toggleMask feedback={false} />
                        </div> */}
                            <div className={style['sigup-inside']}>
                                <label >Name</label>
                                <InputText disabled={block} placeholder='Name' {...register("name")} />
                            </div>
                            <div className={style['sigup-inside']}>
                                <label >Phone Number</label>
                                <InputText disabled={block} placeholder='Phone Number' {...register("phoneNumber")} />
                            </div>
                            <div className={style['sigup-inside']}>
                                <label >Address</label>
                                <InputTextarea disabled={block} autoResize placeholder='Address' rows={5} {...register("address")} />
                            </div>
                            <div className={style['sigup-btn-container']}>
                                <div className={style['btn-inside']}>
                                    {block ? <Button type='button' onClick={(e) => {
                                        e.preventDefault
                                        setBlock(false)
                                    }}>Edit</Button> :
                                        <>
                                            <Button type='button' id={style['cancel']} onClick={(e) => {
                                                router.reload(window.location.pathname)
                                            }}>
                                                {/* <Link style={{ textDecoration: "none", color: "#FEFEFE" }} 
                                                    Cancel
                                                </Link> */}
                                                Cancel
                                            </Button>
                                            <Button type='submit'>Confirm</Button>
                                        </>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}
export default UserSettingResult