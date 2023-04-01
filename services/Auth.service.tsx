import axios from "../axios.config"
import { loginForm } from "components/interfaces";
import { Component } from "react";
import { toaster } from "evergreen-ui";
import Router from "next/router";
import Cookies from "js-cookie";

export class AuthService extends Component {
    state = {
        router: Router,
    };
    async Login(user: loginForm) {
        try {
            await axios.post('http://localhost:8080/login', user)
                .then(async (res) => {
                    sessionStorage.setItem('authType', JSON.stringify(res.data.tokenType));
                    Cookies.set("token", res.data.accessToken);
                    await sessionStorage.setItem('role',res.data.role)
                    const authType = JSON.parse(sessionStorage.getItem("authType")!);
                    const token = Cookies.get("token");
                    axios.defaults.headers.common["Authorization"] = `${authType} ${token}`;
                    this.getUserId(user.username)
                    await sessionStorage.setItem('user', user.username)
                    toaster.success("Login Successful", {
                        description: `Welcome to CarForU`,
                        duration: 3,
                    });
                    this.state.router.push("/buy-new");
                })
        } catch {
            toaster.danger("Login Failed", {
                description: `Invalid Username or Password`,
                duration: 3,
            });
        }
    }
    async getUserId(username: string) {
        try {
            return await axios.get('http://localhost:8080/getUserId', {
                params: {
                    username: username
                }
            })
                .then((res) => sessionStorage.setItem('userId', res.data)
                );
        } catch (err: any) {
            toaster.danger("Get User id Error!", {
                duration: 5,
            });
        }
    }
}