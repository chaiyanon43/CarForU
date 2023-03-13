import style from "../styles/Login.module.css"
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from "primereact/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginForm } from "components/interfaces";
import { AuthService } from "services/Auth.service";
import { useRouter } from "next/router";

const Login = () => {
    const { register, handleSubmit, getValues, setValue, resetField, formState: { errors } } = useForm<loginForm>();
    const router = useRouter();
    const authService = new AuthService(router)
    const userSubmmit: SubmitHandler<loginForm> = async (user) => {
        await authService.Login(user);
    }
    return (<>
        <div className={style['login-container']}>
            <div className={style['login-box']}>
                <h1 style={{ color: '#FEFEFE' }}>LOGIN</h1>
                <form onSubmit={handleSubmit(userSubmmit)}>
                    <div className={style['login-inside']}>
                        <label style={{ color: '#FEFEFE' }}>Username</label>
                        <InputText placeholder='Username' {...register('username')}/>
                    </div>
                    <div className={style['login-inside']}>
                        <label style={{ color: '#FEFEFE' }}>Password</label>
                        <Password placeholder='Password' feedback={false} onChange={(e) => setValue('password', e.target.value)}/>
                    </div>
                    <div className={style['login-inside']}>
                        <div className={style['login-inside-button']}>
                            <Button id={style['signup']}>
                                <Link style={{ textDecoration: "none",color: "#FEFEFE" }} href={'/sign-up'}>
                                    Sign-up
                                </Link>
                            </Button>
                            <Button id={style['login']} type="submit">Login</Button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </>)
}
export default Login