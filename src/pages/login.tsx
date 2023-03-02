import style from "../styles/Login.module.css"
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import Link from "next/link";

const Login = () => {
    return (<>
        <div className={style['login-container']}>
            <div className={style['login-box']}>
                <h1 style={{ color: '#FEFEFE' }}>LOGIN</h1>
                <form>
                    <div className={style['login-inside']}>
                        <label style={{ color: '#FEFEFE' }}>Username</label>
                        <InputText placeholder='Username' />
                    </div>
                    <div className={style['login-inside']}>
                        <label style={{ color: '#FEFEFE' }}>Password</label>
                        <Password placeholder='Password' toggleMask />
                    </div>
                    <div className={style['login-inside']}>
                        <div className={style['login-inside-button']}>
                            <Button id={style['signup']}>
                                <Link style={{ textDecoration: "none",color: "#FEFEFE" }} href={'/sign-up'}>
                                    Sign-up
                                </Link>
                            </Button>
                            <Button id={style['login']}>Login</Button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </>)
}
export default Login