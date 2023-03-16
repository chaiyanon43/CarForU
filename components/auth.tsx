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
    const redirect = useCallback(() => {
        setAuthenticate(token !== undefined);
        axios.defaults.headers.common["Authorization"] = `${authType} ${token}`;

        if (!(router.asPath === "/login" || router.asPath === "/sign-up")) {
            if (!token) {
                  router.push("/login");  
            }
        }
        if (router.asPath === "/login" || router.asPath === "/sign-up") {
            if (token) {
                router.back();
            }
        }
    }, [authType, router, token]);
    useEffect(() => {
        redirect();
    }, [redirect, token]);

    if (
        (authenticate && (router.asPath === "/login" || router.asPath === "/sign-up")) ||
        (!authenticate && !(router.asPath === "/login" || router.asPath === "/sign-up")) ||
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
