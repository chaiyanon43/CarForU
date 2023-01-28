import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import style from '../styles/SignUp.module.css';
import { InputTextarea } from 'primereact/inputtextarea';


interface SignupFormProps {
    displayBasicSignup: boolean;
    renderFooterSignup: Function;
    setDisplayBasicSignup: Dispatch<SetStateAction<boolean>>;
}
const Signup = (props: SignupFormProps) => {
    const { displayBasicSignup, renderFooterSignup, setDisplayBasicSignup } = props
    const [value, setValue] = useState()
    return (<>
        <Dialog header="Sign Up" visible={displayBasicSignup} style={{width:'630px' ,maxWidth:'90%'}}  footer={renderFooterSignup()} onHide={() => setDisplayBasicSignup(false)}>
            <div className="flex justify-content-center">
                <i className='pi pi-user' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px'}}></i>
                <form className="p-fluid">
                    <div className="field">
                        <label>Username</label>
                        <InputText placeholder='Username'/>
                    </div>
                    <div className="field">
                        <label >Password</label>
                        <Password placeholder='Password' toggleMask />
                    </div>
                    <div className="field">
                        <label >Confirm Password</label>
                        <Password placeholder='Confirm Password' toggleMask feedback={false}/>
                    </div>
                    <div className="field">
                        <label >Name</label>
                        <InputText placeholder='Name'/>
                    </div>
                    <div className="field">
                        <label >Phone Number</label>
                        <PhoneInput defaultCountry={'TH'} value={value} onChange={(e)=>setValue} placeholder='Phone Number' className={style['phone_input']} style={{color:'color: #495057'}}/>
                    </div>
                    <div className="field">
                        <label >Address</label>
                        <InputTextarea autoResize placeholder='Address' rows={5}/>
                    </div>
                </form>
            </div>

        </Dialog>
    </>)
}
export default Signup