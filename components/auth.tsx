
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

interface ProtectedRouteInterface {
    children?: React.ReactNode;
}

export default function Auth(props: ProtectedRouteInterface) {
    const { children } = props;
    const router = useRouter();
    useEffect(() => {
        if (router.asPath === "/") {
            router.push("/home");
        }
    }, [])

    if (
        (router.asPath === "/")
    ) {
        return (
            <div>
                <p>loading....</p>
            </div>
        );
    }

    return <>{children}</>;
}
