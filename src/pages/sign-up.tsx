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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<userForm>();
    const [fileName, setFileName] = useState<string>('None');
    const userSubmmit: SubmitHandler<userForm> = (user) => {
        // axios.post('http://localhost:8080/addUser', {
        //     image: user.image,
        //     username: user.username,
        //     password: user.password,
        //     name: user.name,
        //     phoneNumber: user.phoneNumber,
        //     address: user.address
        // }, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        // }).then((res: any) => {
        //     alert(res.data)
        // }).catch((err: any) => {
        //     alert("Add User Failed.")
        // })
        console.log(user)
    }
        const hiddenFileInput = React.useRef(null);

        const handleClick = (event: any) => {
            hiddenFileInput.current!.click();
        };
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                setValue('image', event.target.files[0])
                setFileName(event.target.files[0].name)
            }
        };


        return (<>

            <div className={style['signup-container']}>
                <div className={style['signup-box']}>
                <form onSubmit={handleSubmit(userSubmmit)} encType='multipart/form-data'>
                    <div>
                        <div className={style["profile-image"]}>
                            <i className='pi pi-user'>
                                <i className='pi pi-times-circle'></i>
                            </i>
                            <label>Choose file: <span><input className={style['input-file-name']} value={fileName} disabled></input></span></label>
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
                        <div className={style['sigup-inside']}>
                            <Button type='submit'>Sign Up</Button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>)
    }
    export default Signup