import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie"
import axios from "../axios.config"
import { useSessionStorage } from "usehooks-ts";
interface ProtectedRouteInterface {
  children?: React.ReactNode;
}

export default function Auth(props: ProtectedRouteInterface) {
  const { children } = props;
  const router = useRouter();
  const [authType] = useSessionStorage("authType", "Bearer ");
  const token = Cookies.get("token");
  const [authenticate, setAuthenticate] = useState<boolean>();
  const [isAdmin,setIsAdmin] = useState<boolean>();
  const [role,setRole] = useState<string>();
  const redirect = useCallback(() => {

    setAuthenticate(token !== undefined);
    setIsAdmin(sessionStorage.getItem("role") !== "admin")
    axios.defaults.headers.common["Authorization"] = `${authType} ${token}`;

    if (!(router.asPath === "/login" || router.asPath === "/sign-up" || router.asPath === "/home")) {
      if (!token) {
        router.push("/home");
      }
    }
    if (router.asPath === "/login" || router.asPath === "/sign-up" || router.asPath === "/add-model" || router.asPath === "/users") {
      if (token && (router.asPath === "/login" || router.asPath === "/sign-up")) {
        router.back();
      }
      if(token && ((router.asPath === "/add-model" || router.asPath === "/users") && sessionStorage.getItem('role') !== "admin")){
        router.back();
      }
    }
  }, [authType, router, token]);
  useEffect(() => {
    setRole(sessionStorage.getItem('role')!)
    redirect();
  }, [redirect, token]);

  if (
    (authenticate && (router.asPath === "/login" || router.asPath === "/sign-up")) ||
    (!authenticate && !(router.asPath === "/login" || router.asPath === "/sign-up" || router.asPath === "/home"))||
    (role!== "admin" && (router.asPath === "/add-model" || router.asPath === "/users")) || 
    authenticate === undefined
  ) {
    return (
      <div>
        Loading ....
      </div>
    );
  }

  return <>{children}</>;
}
