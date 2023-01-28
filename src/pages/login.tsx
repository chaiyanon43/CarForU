import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

interface LoginFormProps {
    displayBasic: boolean;
    renderFooter: Function;
    setDisplayBasic: Dispatch<SetStateAction<boolean>>;
}
const Login = (props: LoginFormProps) => {
    const { displayBasic, renderFooter, setDisplayBasic } = props
    return (<>
        <Dialog header="Login" visible={displayBasic} style={{width:'630px' ,maxWidth:'90%'}}  footer={renderFooter()} onHide={() => setDisplayBasic(false)}>
            <div className="flex justify-content-center">
                <form className="p-fluid">
                    <div className="field">
                        <label>Username</label>
                        <InputText placeholder='Username'/>
                    </div>
                    <div className="field">
                        <label >Password</label>
                        <Password placeholder='Password' toggleMask />
                    </div>
                </form>
            </div>

        </Dialog>
    </>)
}
export default Login