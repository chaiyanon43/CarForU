import { Dialog } from 'primereact/dialog';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import style from '../styles/SignUp.module.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from 'primereact/button';
import React from 'react';
import Image from 'next/image';
import { FileUpload } from 'primereact/fileupload';
import Link from 'next/link';
import { toaster } from 'evergreen-ui';



interface SignupFormProps {
    displayBasicSignup: boolean;
    renderFooterSignup: Function;
    setDisplayBasicSignup: Dispatch<SetStateAction<boolean>>;
}
interface userForm {
    username: string;
    password: string;
    name: string;
    image: File;
    phoneNumber: string;
    address: string;

}
const Signup = (props: SignupFormProps) => {
    const { displayBasicSignup, renderFooterSignup, setDisplayBasicSignup } = props;
    const { register, handleSubmit, getValues, setValue, resetField, formState: { errors } } = useForm<userForm>();
    const [fileName, setFileName] = useState<string>('None');
    const [file, setFile] = useState();
    const [imageURL, setImageURL] = useState<string>();
    const userSubmmit: SubmitHandler<userForm> = (user) => {
        if (!user.image) {
            toaster.warning("กรุณาเพิ่มรูปภาพโปรไฟล์ และ กรอกข้อมูลให้ครบถ้วน",{duration:3})
            return
        }
        axios.post('http://localhost:8080/addUser', {
            image: user.image,
            username: user.username,
            password: user.password,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res: any) => {
            toaster.success(res.data,{duration:3})

        }).catch((err: any) => {
            toaster.danger('เพิ่ม User ไม่สำเร็จ',{duration:3})

        })

    }
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event: any) => {
        hiddenFileInput.current!.click();
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files[0]) {
                setValue('image', event.target.files[0])
                setImageURL(URL.createObjectURL(event.target.files[0]))
                setFileName(event.target.files[0].name)
            }
        }
    };
    const onUploadFile = async (e: any) => {
        setFile(e.files)
        setImageURL(URL.createObjectURL(e.files[0]))
    }
    const onRemoveFile = async (e: any) => {
    }


    return (<>

        <div className={style['signup-container']}>
            <div className={style['signup-box']}>
                <form onSubmit={handleSubmit(userSubmmit)} encType='multipart/form-data'>
                    <div>
                        <div className={style["profile-image"]}>
                            <i className='pi pi-user' >
                                {getValues('image') && <img src={imageURL} />}
                                <i className='pi pi-times-circle' onClick={(e) => {
                                    setImageURL('')
                                    setFileName('')
                                    setFile(undefined)
                                    setValue('image', undefined)
                                }} ></i>
                            </i>
                            <label style={{ color: "#FEFEFE" }}>Choose file: <span><input className={style['input-file-name']} value={fileName} disabled></input></span></label>
                            <button type='button' onClick={handleClick}>Upload a file</button>
                            <input type='file' ref={hiddenFileInput}
                                onChange={handleChange} id={style["file-input"]} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label>Username</label>
                            <InputText placeholder='Username' {...register("username")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Password</label>
                            <Password placeholder='Password' feedback={false} onChange={(e) => setValue('password', e.target.value)} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Confirm Password</label>
                            <Password placeholder='Confirm Password' toggleMask feedback={false} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Name</label>
                            <InputText placeholder='Name' {...register("name")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Phone Number</label>
                            <InputText placeholder='Phone Number' {...register("phoneNumber")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Address</label>
                            <InputTextarea autoResize placeholder='Address' rows={5} {...register("address")} />
                        </div>
                        <div className={style['sigup-btn-container']}>
                            <div className={style['btn-inside']}>
                                <Button type='button' id={style['cancel']}>
                                    <Link style={{ textDecoration: "none", color: "#FEFEFE" }} href={'/login'}>
                                        Cancel
                                    </Link></Button>
                                <Button type='submit'>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    </>)
}
export default Signup